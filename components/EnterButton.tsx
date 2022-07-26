import { useMoralis, useWeb3Contract } from "react-moralis";
import styles from "./EnterButton.module.css";
import { abi, contractAddress as addresses } from "../constants/index";

export function EnterButton(props: any) {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex as string);
  const contractAddress: any =
    chainId in addresses ? addresses[chainId][0] : null;

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: "enterRaffle",
    msgValue: "10000000000000000", // 0.01 ETH
  });

  function handleSucess(tx: any) {
    console.log("sucess");
    tx.wait(1);
    props.update();
  }
  function handleError(error: any) {
    console.log(error);
    props.update();
  }

  return (
    <button
      onClick={() =>
        enterRaffle({ onSuccess: handleSucess, onError: handleError })
      }
      className={styles.btn}
    >
      Enter Raffle
    </button>
  );
}
