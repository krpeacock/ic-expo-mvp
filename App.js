import "react-native-get-random-values";
import "react-native-polyfill-globals/auto";
globalThis.TextEncoder = TextEncoder;
window.TextEncoder = TextEncoder;
import React from "react";
import { StyleSheet, View } from "react-native";
import { TextEncoder } from "text-encoding";
import LoggedOut from "./src/app/components/LoggedOut";
import LoggedIn from "./src/app/components/LoggedIn";
import { useAuth } from "./src/app/hooks/useAuth";

export default function App() {
  const { identity } = useAuth();
  console.log("identity", identity);

  return (
    <View style={styles.container} accessible={true}>
      {identity ? <LoggedIn identity={identity} /> : <LoggedOut />}
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
