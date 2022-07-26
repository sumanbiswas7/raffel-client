import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import styles from "./Connect.module.css";

type ButtonType = "Connected" | "Connect Wallet";

export function ConnectButton() {
  const {
    enableWeb3,
    deactivateWeb3,
    web3EnableError,
    isWeb3EnableLoading,
    Moralis,
    isWeb3Enabled,
  } = useMoralis();
  const [btnText, setBtnTxt] = useState<ButtonType>();

  useEffect(() => {
    if (window.localStorage.getItem("connected") != null) {
      setBtnTxt("Connected");
    } else {
      setBtnTxt("Connect Wallet");
    }
    Moralis.onAccountChanged(() => {
      disable();
      setBtnTxt("Connect Wallet");
    });
  }, [isWeb3Enabled]);

  useEffect(() => {
    if (isWeb3Enabled) {
      setBtnTxt("Connected");
    } else {
      setBtnTxt("Connect Wallet");
    }
  }, [isWeb3Enabled, web3EnableError]);

  async function enable() {
    await enableWeb3();
    window.localStorage.setItem("connected", "injected");
  }
  async function disable() {
    await deactivateWeb3();
    window.localStorage.removeItem("connected");
  }

  return (
    <>
      <button
        className={styles.btn}
        onClick={enable}
        disabled={isWeb3EnableLoading}
      >
        {btnText}
      </button>
      {web3EnableError && <p>{web3EnableError.message}</p>}
    </>
  );
}
