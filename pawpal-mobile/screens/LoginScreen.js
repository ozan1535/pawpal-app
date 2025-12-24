// /* import { View, Button } from "react-native";
// import { signInWithGoogle } from "../auth/google";
// import { signIn } from "../auth/email";

// export default function LoginScreen() {
//   return (
//     <View style={{ padding: 60 }}>
//       <Button title="Sign in with Google" onPress={signInWithGoogle} />

//       <Button
//         title="Sign in with Email"
//         onPress={() => signIn("test@example.com", "password123")}
//       />
//     </View>
//   );
// }
//  */

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useAuth } from "../contexts/AuthContext";

// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);

//   const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

//   const handleEmailAuth = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please enter email and password");
//       return;
//     }

//     setLoading(true);
//     try {
//       if (isSignUp) {
//         await signUpWithEmail(email, password);
//         Alert.alert("Success", "Check your email for verification link");
//       } else {
//         await signInWithEmail(email, password);
//       }
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       const { url } = await signInWithGoogle();

//       if (url) {
//         const result = await WebBrowser.openAuthSessionAsync(url, "myapp://");

//         if (result.type === "success") {
//           // Session will be detected by onAuthStateChange listener
//           console.log("OAuth success");
//         } else if (result.type === "cancel") {
//           Alert.alert("Cancelled", "Login was cancelled");
//         }
//       }
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>
//           {isSignUp ? "Create Account" : "Welcome Back"}
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//           autoComplete="email"
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           autoCapitalize="none"
//           autoComplete="password"
//         />

//         <TouchableOpacity
//           style={styles.primaryButton}
//           onPress={handleEmailAuth}
//           disabled={loading}
//         >
//           <Text style={styles.primaryButtonText}>
//             {isSignUp ? "Sign Up" : "Sign In"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.secondaryButton}
//           onPress={() => setIsSignUp(!isSignUp)}
//         >
//           <Text style={styles.secondaryButtonText}>
//             {isSignUp
//               ? "Already have an account? Sign In"
//               : "Don't have an account? Sign Up"}
//           </Text>
//         </TouchableOpacity>

//         <View style={styles.divider}>
//           <View style={styles.dividerLine} />
//           <Text style={styles.dividerText}>OR</Text>
//           <View style={styles.dividerLine} />
//         </View>

//         <TouchableOpacity
//           style={styles.googleButton}
//           onPress={handleGoogleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.googleButtonText}>Continue with Google</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     justifyContent: "center",
//   },
//   formContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 30,
//     textAlign: "center",
//     color: "#333",
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   primaryButton: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   primaryButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   secondaryButton: {
//     padding: 15,
//     alignItems: "center",
//   },
//   secondaryButtonText: {
//     color: "#007AFF",
//     fontSize: 14,
//   },
//   divider: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#ddd",
//   },
//   dividerText: {
//     marginHorizontal: 10,
//     color: "#999",
//     fontSize: 14,
//   },
//   googleButton: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   googleButtonText: {
//     color: "#333",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export const handleGoogleLogin = async () => {
//   setLoading(true);
//   try {
//     const { url } = await signInWithGoogle();

//     if (url) {
//       console.log("Opening OAuth URL:", url);

//       const result = await WebBrowser.openAuthSessionAsync(url, "myapp://", {
//         showInRecents: true,
//       });

//       console.log("OAuth result:", result);

//       if (result.type === "cancel") {
//         Alert.alert("Cancelled", "Login was cancelled");
//       }
//       // Success will be handled by the URL event listener in AuthContext
//     }
//   } catch (error) {
//     console.error("Google login error:", error);
//     Alert.alert("Error", error.message);
//   } finally {
//     setLoading(false);
//   }
// };

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "../contexts/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  // ← Must be "export default"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
        Alert.alert("Success", "Check your email for verification link");
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { url } = await signInWithGoogle();

      if (url) {
        //  console.log("Opening OAuth URL:", url);

        const result = await WebBrowser.openAuthSessionAsync(url, "myapp://", {
          showInRecents: true,
        });

        //  console.log("OAuth result:", result);

        if (result.type === "cancel") {
          Alert.alert("Cancelled", "Login was cancelled");
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 64,
            padding: 30,
            borderWidth: 2,
            borderColor: "white",
            borderStyle: "dashed",
            borderRadius: 1000,
            textAlign: "center",
          }}
        >
          🐶
        </Text>
        <Text style={{ marginTop: 10, fontSize: 20 }}>PawPal</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {isSignUp ? "Hesap oluşturun" : "Hoşgeldiniz"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Parola"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
        />
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleEmailAuth}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {isSignUp ? "Üye ol" : "Giriş Yap"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setIsSignUp(!isSignUp)}
        >
          <Text style={styles.secondaryButtonText}>
            {isSignUp
              ? "Zaten bir hesabınız var mı? Giriş yapın"
              : "Hesabınız yok mu? Kayıt Olun"}
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>YA DA</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          <Text style={styles.googleButtonText}>Google ile devam edin</Text>
        </TouchableOpacity> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbe4d6",
    justifyContent: "center",
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    padding: 15,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 14,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#999",
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  pawpalText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});
