import "react-native-polyfill-globals/auto";
import { Actor, HttpAgent } from "@dfinity/agent";
import { blsVerify } from "@dfinity/bls-verify";
import { idlFactory } from "./declarations/backend";

// const isDevelopment = process.env.EXPO_PUBLIC_ENVIRONMENT === "local";
const isDevelopment = false;

const CANISTER_ID = isDevelopment
  ? "bkyz2-fmaaa-aaaaa-qaaaq-cai"
  : "r6sob-saaaa-aaaab-qaiga-cai";

const NETWORK = isDevelopment ? "http://127.0.0.1:4943" : "https://icp-api.io";

export const createActor = (canisterId, options = {}) => {
  const agent =
    options.agent ||
    new HttpAgent({ ...options.agentOptions, verifyQuerySignatures: false });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  // if (process.env.EXPO_PUBLIC_ENVIRONMENT !== "ic") {
  agent.fetchRootKey().catch((err) => {
    console.warn(
      "Unable to fetch root key. Check to ensure that your local replica is running"
    );
    console.error(err);
  });
  // }

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
