import React from "react";
import { View, Text, Pressable } from "react-native";

const remToPx = (rem) => rem * 16;

const containerStyles = {
  fontFamily: "Montserrat, sans-serif",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: remToPx(2),
  paddingVertical: remToPx(2),
};

const baseTextStyles = {
  fontFamily: "Montserrat, sans-serif",
  fontSize: remToPx(1),
  marginBottom: remToPx(1),
};

const headerStyles = {
  ...baseTextStyles,
  fontSize: remToPx(1.8),
};

const subheaderStyles = {
  ...baseTextStyles,
  fontSize: remToPx(1.2),
};

const buttonStyles = {
  borderColor: "#c3c3c4",
  borderWidth: 1,
  backgroundColor: "#fff",
  display: "flex",
  width: "100%",
  textAlign: "center",
  justifyContent: "center",
  backgroundColor: "white",
  marginBottom: remToPx(1),
  paddingVertical: remToPx(0.6),
  paddingHorizontal: remToPx(1),
  borderRadius: 4,
};

const disabledButtonStyles = {
  ...buttonStyles,
  opacity: 0.5,
};

const buttonTextStyles = {
  ...baseTextStyles,
  marginBottom: 0,
  fontSize: remToPx(1.2),
};

export default function LoggedOut() {
  const [busy, setBusy] = React.useState(false);

  function login() {
    setBusy(true);
    console.log("login");
  }

  return (
    <View id="container" style={containerStyles}>
      <Text style={headerStyles}>Internet Identity Client</Text>
      <Text style={subheaderStyles}>You are not authenticated</Text>
      <Text style={baseTextStyles}>To log in, click this button</Text>
      <Pressable
        title="log in"
        style={busy ? disabledButtonStyles : buttonStyles}
        accessibilityRole="button"
        disabled={busy}
        accessibilityState={{ busy }}
        onPress={login}
      >
        <Text style={buttonTextStyles}>Log in</Text>
      </Pressable>
    </View>
  );
}