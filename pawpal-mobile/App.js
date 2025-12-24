import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import * as Linking from "expo-linking";
import WebViewScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const prefix = Linking.createURL("/");

function AppContent() {
  const { user, loading } = useAuth();

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        //  console.log("Initial URL:", url);
      }
    });

    const subscription = Linking.addEventListener("url", ({ url }) => {
      //    console.log("Deep link received:", url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return user ? <WebViewScreen /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
});
