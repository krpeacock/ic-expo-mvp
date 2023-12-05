import { useState, useEffect } from "react";
import { toHex } from "@dfinity/agent";
import {
  Ed25519KeyIdentity,
  DelegationChain,
  DelegationIdentity,
} from "@dfinity/identity";
import * as WebBrowser from "expo-web-browser";
import { useURL, createURL, openURL, canOpenURL } from "expo-linking";

/**
 *
 * @param {?Ed25519KeyIdentity} initialKey base key
 * @returns
 */
export const useAuth = (initialKey) => {
  const [baseKey, setBaseKey] = useState(
    initialKey ?? Ed25519KeyIdentity.generate()
  );
  const url = useURL();
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    const search = new URLSearchParams(url?.split("?")[1]);
    const delegation = search.get("delegation");
    if (delegation) {
      const chain = DelegationChain.fromJSON(
        JSON.parse(decodeURIComponent(delegation))
      );
      const id = DelegationIdentity.fromDelegation(baseKey, chain);
      console.log("delegation: ", id);
      setIdentity(id);

      // const baseURL = createURL();
      // if (canOpenURL(baseURL)) {
      //   openURL(baseURL);
      // }
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
    console.log(url.toString());
    return await WebBrowser.openBrowserAsync(url.toString());
  };

  // Clear identity on logout
  const logout = () => setIdentity(null);

  return {
    baseKey,
    setBaseKey,
    identity,
    login,
    logout,
  };
};
