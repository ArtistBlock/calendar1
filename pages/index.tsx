import { MediaRenderer, useAddress, useContract, useContractMetadata, useNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { NFT_CONTRACT_ADDRESS } from "../constants/constants";
import { Gift } from "../components/Gift";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(NFT_CONTRACT_ADDRESS);
  const { data: contractMetadata } = useContractMetadata(contract);
  const { data: nfts, isLoading: isLoadingNfts } = useNFTs(contract);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "82vh",
      justifyContent: "space-between",
      border: "1px solid #fff", 
      padding: "20px", 
      borderRadius: "10px", 
    }}>
      <div style={{ flex: 1 }}>
        {address ? (
          isLoadingNfts ? (
            <p>Loading...</p>
          ) : (
            <div className={styles.grid} style={{ marginTop: "40px" }}>
              {nfts && nfts.length > 0 ? (
                nfts.map((nft) => (
                  <Gift
                    nft={nft}
                    key={nft.metadata.id}
                  />
                ))
              ) : (
                <p>No NFTs found.</p>
              )}
            </div>
          )
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            maxWidth: "90%",
          }}>
            <MediaRenderer
              src={contractMetadata?.image}
              style={{
                borderRadius: "10px",
              }}
            />
            <h1>Login to claim gifts.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
