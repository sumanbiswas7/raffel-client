import { useMoralis, useWeb3Contract } from "react-moralis";
import styles from "./Grid.module.css";
import { abi, contractAddress as addresses } from "../constants/index";
import { useEffect, useState } from "react";

export function Grid(props: any) {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex as string);
  const contractAddress: any =
    chainId in addresses ? addresses[chainId][0] : null;
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [recWinner, setRecWinner] = useState();
  const { runContractFunction: getTotalPlayers } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: "getTotalPlayers",
  });
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: "getRecentWinner",
  });

  async function updateUI() {
    const totalPlayers: any = await getTotalPlayers();
    const recWinner: any = await getRecentWinner();
    if (isWeb3Enabled) {
      setTotalPlayers(totalPlayers.toString());
      setRecWinner(recWinner.toString());
    }
  }

  useEffect(() => {
    updateUI();
  }, [isWeb3Enabled, props.updateui]);

  return (
    <div className={styles.grid}>
      <p>Players joined - {totalPlayers}</p>
      <p>Entrance Fee - 0.01 ETH</p>
      <p>Recent Winner - {recWinner}</p>
    </div>
  );
}
