import {
  AnonymousIdentity,
  SignIdentity,
  fromHex,
  toHex,
} from "@dfinity/agent";
import { Ed25519KeyIdentity, Ed25519PublicKey } from "@dfinity/identity";
import { defineElement, IILoginButton } from "@dfinity/ii-login-button";

async function main() {
  // initialize the login button
  defineElement();

  /**
   * @type {IILoginButton}
   */
  const button = document.querySelector("ii-login-button");
  button.addEventListener("ready", () => {
    console.log("ready");
    const { redirectUri, identity } = parseParams();

    button.configure({
      createOptions: {
        identity,
      },
      loginOptions: {
        identityProvider: `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`,
        onSuccess: () => {
          console.log("onSuccess");
          const delegationIdentity = button.identity;

          var delegationString = JSON.stringify(
            delegationIdentity.getDelegation().toJSON()
          );

          console.log(delegationString);

          const encodedDelegation = encodeURIComponent(delegationString);
          const url = new URL(redirectUri);
          url.searchParams.set("delegation", encodedDelegation);
          console.log(`Redirecting to ${url.toString()}`);

          window.open(url, "_self");
        },
        onError: (error) => {
          console.log("onError");
          console.log(error);
        },
      },
    });
  });
}

class IncompleteEd25519KeyIdentity extends SignIdentity {
  constructor(publicKey) {
    super();
    this._publicKey = publicKey;
  }

  getPublicKey() {
    return this._publicKey;
  }
}

/**
 * Parses the query string parameters from the URL.
 * @returns {{redirectUri: string; identity: SignIdentity}} The parsed query string parameters.
 */
function parseParams() {
  const url = new URL(window.location.href);
  const redirectUri = url.searchParams.get("redirect_uri");
  const pubKey = url.searchParams.get("pubkey");

  const identity = new IncompleteEd25519KeyIdentity(
    Ed25519PublicKey.fromDer(fromHex(pubKey))
  );

  if (!redirectUri || !identity) {
    throw new Error("Missing redirect_uri or pubkey in query string");
  }
  return { redirectUri, identity };
}

window.addEventListener("DOMContentLoaded", () => {
  main();
});
