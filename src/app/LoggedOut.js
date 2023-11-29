import React from "react";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { toHex } from "@dfinity/agent";
import { View, Text, Pressable } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useURL } from "expo-linking";
import { DelegationChain, DelegationIdentity } from "@dfinity/identity";
import { createActor } from "./whoamiActor";

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
  const identity = Ed25519KeyIdentity.generate();

  const url = useURL();

  const search = new URLSearchParams(url?.split("?")[1]);
  const delegation = search.get("delegation");

  if (delegation) {
    const chain = DelegationChain.fromJSON(
      JSON.parse(decodeURIComponent(delegation))
    );
    const delegationIdentity = DelegationIdentity.fromDelegation(
      identity,
      chain
    );
    const actor = createActor("ivcos-eqaaa-aaaab-qablq-cai", {
      agentOptions: { identity: delegationIdentity },
    });
    actor.whoami().then((res) => {
      console.log(res);
    });
    console.log(delegationIdentity);
  }

  function login() {
    setBusy(true);
    const derKey = identity.getPublicKey().toDer();
    const redirect = AuthSession.makeRedirectUri({});
    const url = new URL("https://tdpaj-biaaa-aaaab-qaijq-cai.icp0.io/");
    // url.searchParams.set("redirect_uri", encodeURIComponent(redirect));
    url.searchParams.set(
      "redirect_uri",
      encodeURIComponent(`com.anonymous.ic-expo://expo-development-client`)
    );

    url.searchParams.set("pubkey", toHex(derKey));
    console.log(url.toString());
    WebBrowser.openBrowserAsync(url.toString()).finally(() => {
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
        onPress={login}
      >
        <Text style={buttonTextStyles}>Log in</Text>
      </Pressable>
      <Text style={baseTextStyles}>You are not authenticated</Text>
      <Text style={baseTextStyles}>{url}</Text>
    </View>
  );
}
