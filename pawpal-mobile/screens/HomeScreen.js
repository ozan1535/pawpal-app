import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
  Button,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useAuth } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { updateProfileToAddPushToken } from "../services/profiles.services";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { screen: "WebView", url: "/lost-pets" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync(userId) {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      if (pushTokenString) {
        await updateProfileToAddPushToken(userId, pushTokenString);
      }
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function WebViewScreen() {
  const { session, signOut } = useAuth();
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [webViewReady, setWebViewReady] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(undefined);
  // useEffect(() => {
  //   // Log session info when component mounts
  //   // console.log("📱 WebViewScreen mounted");
  //   // console.log("📱 Access token exists:", !!session?.access_token);
  //   // console.log("📱 Refresh token exists:", !!session?.refresh_token);
  //   // console.log("📱 Access token length:", session?.access_token?.length);
  //   // console.log("📱 Refresh token:", session?.refresh_token);
  //   console.log(session?.user?.id, "useruseruseur");
  // }, [session]);

  // useEffect(() => {
  //   if (session?.user?.id) {
  //     registerForPushNotificationsAsync(session?.user?.id)
  //       .then((token) => setExpoPushToken(token ?? ""))
  //       .catch((error) => setExpoPushToken(`${error}`));

  //     const notificationListener =
  //       Notifications.addNotificationReceivedListener((notification) => {
  //         setNotification(notification);
  //       });

  //     const responseListener =
  //       Notifications.addNotificationResponseReceivedListener((response) => {
  //         console.log(response);
  //       });

  //     return () => {
  //       notificationListener.remove();
  //       responseListener.remove();
  //     };
  //   }
  // }, [session?.user?.id]);

  useEffect(() => {
    if (!session?.user?.id) return;

    let isMounted = true;

    const setupPush = async () => {
      try {
        const token = await registerForPushNotificationsAsync(session.user.id);

        if (!token || !isMounted) return;

        setExpoPushToken(token);
      } catch (err) {
        console.error("Push setup failed:", err);
      }
    };

    setupPush();

    const notificationListener =
      Notifications.addNotificationReceivedListener(setNotification);

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(console.log);

    const tokenListener = Notifications.addPushTokenListener(({ data }) => {
      updateProfileToAddPushToken(session.user.id, data);
      setExpoPushToken(data);
    });

    return () => {
      isMounted = false;
      notificationListener.remove();
      responseListener.remove();
      tokenListener.remove();
    };
  }, [session?.user?.id]);

  const handleLogout = async () => {
    try {
      await signOut();

      webViewRef.current?.injectJavaScript(`
        localStorage.removeItem("supabase_access_token");
        localStorage.removeItem("supabase_refresh_token");
        localStorage.removeItem("supabase_user");
        true;
      `);
    } catch (error) {
      console.error("❌ Logout error:", error);
      Alert.alert("Error", error.message);
    }
  };

  const handleWebViewMessage = (event) => {
    console.log("📨 Raw message received:", event.nativeEvent.data);

    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log("📨 Parsed message:", message);

      switch (message.type) {
        case "logout":
          console.log("🚪 Logout message received");

          handleLogout();
          break;
        case "console.log":
          console.log("[🌐 WebView]", ...message.data);
          break;
        case "console.error":
          console.error("[🌐 WebView ERROR]", ...message.data);
          break;
        case "console.warn":
          console.warn("[🌐 WebView WARN]", ...message.data);
          break;
        default:
          console.log("[🌐 WebView Message]", message);
      }
    } catch (error) {
      // Not JSON, just log it
      console.log("[🌐 WebView]", event.nativeEvent.data);
    }
  };

  // Safely escape the user object
  const safeUser = JSON.stringify(session?.user || {})
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");

  const injectedJavaScript = `
    (function() {
      // Override console methods to send to React Native
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      console.log = function(...args) {
        originalLog.apply(console, args);
        try {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'console.log',
            data: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
          }));
        } catch(e) {}
      };
      
      console.error = function(...args) {
        originalError.apply(console, args);
        try {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'console.error',
            data: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
          }));
        } catch(e) {}
      };
      
      console.warn = function(...args) {
        originalWarn.apply(console, args);
        try {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'console.warn',
            data: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
          }));
        } catch(e) {}
      };
      
      // Now inject the auth tokens
      try {
        const accessToken = '${session?.access_token || ""}';
        const refreshToken = '${session?.refresh_token || ""}';
        const user = '${safeUser}';
        
      //  console.log('🔐 Starting auth injection...');
       // console.log('🔐 Access token length:', accessToken.length);
       // console.log('🔐 Refresh token:', refreshToken);
       // console.log('🔐 User data length:', user.length);
        
        // Store tokens in localStorage
        localStorage.setItem('supabase_access_token', accessToken);
        localStorage.setItem('supabase_refresh_token', refreshToken);
        localStorage.setItem('supabase_user', user);
        
        // Verify storage
        const storedAccess = localStorage.getItem('supabase_access_token');
        const storedRefresh = localStorage.getItem('supabase_refresh_token');
       // console.log('✅ Tokens stored successfully');
       // console.log('✅ Stored access token exists:', !!storedAccess);
        //console.log('✅ Stored refresh token exists:', !!storedRefresh);
        
        // Dispatch event so React app can detect it immediately
        window.dispatchEvent(new CustomEvent('mobile-auth-ready', { 
          detail: { 
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: JSON.parse(user)
          }
        }));
        
        // console.log('✅ Mobile auth injected successfully!');
      } catch (error) {
        console.error('❌ Error injecting auth:', error.message, error.stack);
      }
      
      true;
    })();
  `;

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       backgroundColor: "white",
  //       alignItems: "center",
  //       justifyContent: "space-around",
  //     }}
  //   >
  //     <Text>Your Expo push token: {expoPushToken}</Text>
  //     <View style={{ alignItems: "center", justifyContent: "center" }}>
  //       <Text>
  //         Title: {notification && notification.request.content.title}{" "}
  //       </Text>
  //       <Text>Body: {notification && notification.request.content.body}</Text>
  //       <Text>
  //         Data:{" "}
  //         {notification && JSON.stringify(notification.request.content.data)}
  //       </Text>
  //     </View>
  //     <Button
  //       title="Press to Send Notification"
  //       onPress={async () => {
  //         await sendPushNotification(expoPushToken);
  //       }}
  //     />
  //     <WebView
  //       ref={webViewRef}
  //       source={{
  //         uri: "http://192.168.0.19:3000/",
  //       }}
  //       injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
  //       injectedJavaScript={injectedJavaScript}
  //       onLoadStart={() => {
  //         //   console.log("📄 WebView: Load started");
  //         setLoading(true);
  //       }}
  //       onLoadEnd={() => {
  //         //   console.log("📄 WebView: Load ended");
  //         setLoading(false);
  //         setWebViewReady(true);

  //         // Inject again after load completes
  //         //   console.log("📄 WebView: Re-injecting JavaScript...");
  //         webViewRef.current?.injectJavaScript(injectedJavaScript);
  //       }}
  //       onError={(syntheticEvent) => {
  //         const { nativeEvent } = syntheticEvent;
  //         console.error("❌ WebView error:", nativeEvent);
  //         setLoading(false);
  //         Alert.alert(
  //           "Error",
  //           "Failed to load web app: " + nativeEvent.description
  //         );
  //       }}
  //       onHttpError={(syntheticEvent) => {
  //         const { nativeEvent } = syntheticEvent;
  //         console.warn("⚠️ WebView HTTP error:", nativeEvent.statusCode);
  //       }}
  //       onMessage={handleWebViewMessage}
  //       onNavigationStateChange={(navState) => {
  //         //   console.log("🧭 WebView navigation:", navState.url);
  //       }}
  //       style={styles.webview}
  //       javaScriptEnabled={true}
  //       domStorageEnabled={true}
  //       startInLoadingState={true}
  //       scalesPageToFit={true}
  //       cacheEnabled={false}
  //       incognito={false}
  //       mixedContentMode="always"
  //       allowsInlineMediaPlayback={true}
  //       mediaPlaybackRequiresUserAction={false}
  //     />
  //   </View>
  // );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>PawPal</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        >
          <Text style={styles.logoutText}>Notification</Text>
        </TouchableOpacity>
      </View> */}
      {/* {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading web app...</Text>
        </View>
      )} */}
      <WebView
        ref={webViewRef}
        source={{
          uri: "https://pawpal-app-delta.vercel.app/",
        }}
        injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        injectedJavaScript={injectedJavaScript}
        onLoadStart={() => {
          //   console.log("📄 WebView: Load started");
          setLoading(true);
        }}
        onLoadEnd={() => {
          //   console.log("📄 WebView: Load ended");
          setLoading(false);
          setWebViewReady(true);

          // Inject again after load completes
          //   console.log("📄 WebView: Re-injecting JavaScript...");
          webViewRef.current?.injectJavaScript(injectedJavaScript);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("❌ WebView error:", nativeEvent);
          setLoading(false);
          Alert.alert(
            "Error",
            "Failed to load web app: " + nativeEvent.description
          );
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("⚠️ WebView HTTP error:", nativeEvent.statusCode);
        }}
        onMessage={handleWebViewMessage}
        onNavigationStateChange={(navState) => {
          //   console.log("🧭 WebView navigation:", navState.url);
        }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        cacheEnabled={false}
        incognito={false}
        mixedContentMode="always"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#007AFF",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -50,
    marginTop: -50,
    zIndex: 1,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  webview: {
    flex: 1,
  },
});
