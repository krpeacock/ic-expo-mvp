import { useState, useEffect } from "react";
import { toHex } from "@dfinity/agent";
import {
  Ed25519KeyIdentity,
  DelegationChain,
  DelegationIdentity,
  isDelegationValid,
} from "@dfinity/identity";
import * as WebBrowser from "expo-web-browser";
import { useURL } from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export function useAuth() {
  const [baseKey, setBaseKey] = useState();
  const [isReady, setIsReady] = useState(false);
  const url = useURL();
  /**
   * @type {[DelegationIdentity | null, React.Dispatch<DelegationIdentity | null>]} state
   */
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    (async () => {
      const storedKey = await SecureStore.getItemAsync("baseKey");
      if (storedKey) {
        setBaseKey(Ed25519KeyIdentity.fromJSON(storedKey));
      } else {
        const key = Ed25519KeyIdentity.generate();
        setBaseKey(key);
        await save("baseKey", JSON.stringify(key.toJSON()));
      }

      const storedDelegation = await AsyncStorage.getItem("delegation");
      if (storedDelegation) {
        const chain = DelegationChain.fromJSON(JSON.parse(storedDelegation));
        if (isDelegationValid(chain)) {
          const id = new DelegationIdentity(
            Ed25519KeyIdentity.fromJSON(storedKey),
            DelegationChain.fromJSON(JSON.parse(storedDelegation))
          );
          setIdentity(id);
        } else {
          await SecureStore.deleteItemAsync("delegation");
        }
      }
      setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    // If we have an identity, we don't need to do anything
    if (identity) return;

    const search = new URLSearchParams(url?.split("?")[1]);
    const delegation = search.get("delegation");
    if (delegation) {
      const chain = DelegationChain.fromJSON(
        JSON.parse(decodeURIComponent(delegation))
      );
      AsyncStorage.setItem("delegation", JSON.stringify(chain.toJSON()));
      /**
       * @type {DelegationIdentity}
       */
      const id = DelegationIdentity.fromDelegation(baseKey, chain);
      setIdentity(id);

      WebBrowser.dismissBrowser();
    }
  }, [url]);

  // Function to handle login and update identity based on base key
  const login = async () => {
    const derKey = toHex(baseKey.getPublicKey().toDer());
    const url = new URL("https://tdpaj-biaaa-aaaab-qaijq-cai.icp0.io/");
    // url.searchParams.set("redirect_uri", encodeURIComponent(redirect));
    url.searchParams.set(
      "redirect_uri",
      encodeURIComponent(`com.anonymous.ic-expo://expo-development-client`)
    );

    url.searchParams.set("pubkey", derKey);
    return await WebBrowser.openBrowserAsync(url.toString());
  };

  // Clear identity on logout
  const logout = async () => {
    setIdentity(null);
    await AsyncStorage.removeItem("delegation");
  };

  return {
    baseKey,
    setBaseKey,
    identity,
    isReady,
    login,
    logout,
  };
};
