import { Actor, HttpAgent } from "@dfinity/agent";
import { blsVerify } from "@dfinity/bls-verify";
import { idlFactory } from "../declarations/whoami";

const isDevelopment = process.env.EXPO_PUBLIC_ENVIRONMENT === "local";

const CANISTER_ID = "ivcos-eqaaa-aaaab-qablq-cai";

const NETWORK = "https://icp-api.io";

export const createActor = (canisterId, options = {}) => {
  const agent =
    options.agent ||
    new HttpAgent({ ...options.agentOptions, verifyQuerySignatures: false });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const backend_actor = createActor(CANISTER_ID, {
  agentOptions: {
    host: NETWORK,
    fetchOptions: {
      reactNative: {
        __nativeResponseType: "base64",
      },
    },
    blsVerify,
    callOptions: {
      reactNative: {
        textStreaming: true,
      },
    },
  },
});
