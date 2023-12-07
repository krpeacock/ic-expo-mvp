import "react-native-get-random-values";
import "react-native-polyfill-globals/auto";
globalThis.TextEncoder = TextEncoder;
window.TextEncoder = TextEncoder;
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextEncoder } from "text-encoding";
import LoggedOut from "./src/app/components/LoggedOut";
import LoggedIn from "./src/app/components/LoggedIn";
import { useAuth } from "./src/app/hooks/useAuth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { identity, isReady, logout } = useAuth();

  const triggerLogout = () => {
    setIsLoggedIn(false);
    logout();
  };

  useEffect(() => {
    if (identity) {
      setIsLoggedIn(true);
    }
  }, [identity]);

  if (!isReady) return null;

  return (
    <View style={styles.container} accessible={true}>
      {isLoggedIn ? <LoggedIn logout={triggerLogout} /> : <LoggedOut />}
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

export default App;
