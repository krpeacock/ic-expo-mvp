import { canisterId, createActor } from "./declarations/whoami";
export const whoami_actor = createActor("ivcos-eqaaa-aaaab-qablq-cai", {
  agentOptions: {
    host: "https://icp-api.io",
    fetchOptions: {
      reactNative: {
        __nativeResponseType: "base64",
      },
    },
    callOptions: {
      reactNative: {
        textStreaming: true,
      },
    },
  },
});
