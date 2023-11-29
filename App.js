import "react-native-get-random-values";
import "react-native-polyfill-globals/auto";
globalThis.TextEncoder = TextEncoder;
window.TextEncoder = TextEncoder;
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { TextEncoder } from "text-encoding";

import { backend_actor } from "./src/actor";
import LoggedOut from "./src/app/LoggedOut";

export default function App() {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");

  function greet() {
    console.log("greet");
    console.log("network: " + process.env.EXPO_PUBLIC_ENVIRONMENT);
    console.log(name);
    backend_actor
      .greet(name)
      .then((greeting) => {
        console.log(greeting);
        setGreeting(greeting);
      })
      .catch((err) => {
        console.clear();
        console.log(err);
      });
  }

  return (
    <View style={styles.container} accessible={true}>
      <LoggedOut />
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
