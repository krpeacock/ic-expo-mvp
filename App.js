import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-polyfill-globals/auto";
import "react-native-fetch-api";
import { TextEncoder } from "text-encoding";
globalThis.TextEncoder = TextEncoder;
window.TextEncoder = TextEncoder;

process.env.DFX_NETWORK = "ic";
import { whoami_actor } from "./src/actor";

export default function App() {
  const [me, setMe] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    whoami_actor
      .whoami()
      .then((me) => setMe(me.toText()))
      .catch((error) => setError(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Principal: {me}</Text>
      <Text>Error: {error}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
