import type { NextPage } from "next";
import Head from "next/head";
import { ConnectButton } from "../components/Connect";
import { EnterButton } from "../components/EnterButton";
import { Grid } from "../components/Grid";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  function handleUpdate() {}

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Ethereum Raffle</h1>
        <a className={styles.sub_title}>
          a decentralized lottery app, currently avalible only on hardhat local
          network ( ͡❛ ᴥ ͡❛)
        </a>
        <Grid updateui={handleUpdate} />
        <ConnectButton />
        <EnterButton update={handleUpdate} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
