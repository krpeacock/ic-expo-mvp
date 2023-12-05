import React from "react";
import { View, Text, Button } from "react-native";
import {
  baseTextStyles,
  containerStyles,
  subheaderStyles,
  headerStyles,
  buttonStyles,
} from "./styles";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { blsVerify } from "@dfinity/bls-verify";

function LoggedIn({ identity }) {
  console.log("identity", identity);
  // const identity = Ed25519KeyIdentity.generate();
  const [principal, setPrincipal] = React.useState(null);

  const whoami = async () => {
    const agent = new HttpAgent({
      identity,
      host: "https://icp-api.io",
      fetchOptions: {
        reactNative: {
          __nativeResponseType: "base64",
        },
      },
      blsVerify,
      verifyQuerySignatures: true,
      callOptions: {
        reactNative: {
          textStreaming: true,
        },
      },
    });
    const idlFactory = ({ IDL }) => {
      return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ["query"]) });
    };
    const actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: "ivcos-eqaaa-aaaab-qablq-cai",
    });

    const response = await actor.whoami();
    console.log("response", response);
    return response;
  };

  return (
    <View style={containerStyles}>
      <Text style={headerStyles}>Internet Identity Client</Text>
      <Text style={subheaderStyles}>You are authenticated!</Text>
      <Text style={baseTextStyles}>
        To see how a canister views you, click this button!
      </Text>
      <Button
        title="whoami"
        style={buttonStyles}
        onPress={() => {
          whoami().then((principal) => {
            setPrincipal(Principal.from(principal).toString());
          });
        }}
      />
      {principal && (
        <View>
          <Text style={baseTextStyles}>Principal: {principal}</Text>
        </View>
      )}
    </View>
  );
}

export default LoggedIn;
