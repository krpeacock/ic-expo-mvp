import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAuth } from "../hooks/useAuth";
import {
  baseTextStyles,
  containerStyles,
  subheaderStyles,
  headerStyles,
  buttonStyles,
  disabledButtonStyles,
  buttonTextStyles,
} from "./styles";

export default function LoggedOut() {
  const [busy, setBusy] = React.useState(false);
  const { login } = useAuth();

  function handlePress() {
    setBusy(true);
    login().then(() => {
      setBusy(false);
    });
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
        onPress={handlePress}
      >
        <Text style={buttonTextStyles}>Log in</Text>
      </Pressable>
      <Text style={baseTextStyles}>You are not authenticated</Text>
    </View>
  );
}

// async function whoami(identity) {
//   const agent = new HttpAgent({
//     identity,
//     host: "https://icp-api.io",
//     fetchOptions: {
//       reactNative: {
//         __nativeResponseType: "base64",
//       },
//     },
//     blsVerify,
//     verifyQuerySignatures: false,
//     callOptions: {
//       reactNative: {
//         textStreaming: true,
//       },
//     },
//   });
//   const idlFactory = ({ IDL }) => {
//     return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], []) });
//   };
//   const actor = Actor.createActor(idlFactory, {
//     agent,
//     canisterId: "ivcos-eqaaa-aaaab-qablq-cai",
//   });

//   return await actor.whoami();
// }
