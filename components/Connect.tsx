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
  const [btnText, setBtnTxt] = useState<ButtonType>("Connect Wallet");

  useEffect(() => {
    if (window.localStorage.getItem("connected") != null)
      setBtnTxt("Connected");
    Moralis.onAccountChanged(() => {
      disable();
      setBtnTxt("Connect Wallet");
    });
  }, [isWeb3Enabled]);

  async function enable() {
    await enableWeb3();
    if (!web3EnableError?.message) {
      setBtnTxt("Connected");
      window.localStorage.setItem("connected", "injected");
    }
  }
  async function disable() {
    await deactivateWeb3();
    if (!web3EnableError?.message) {
      window.localStorage.removeItem("connected");
      setBtnTxt("Connect Wallet");
    }
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
