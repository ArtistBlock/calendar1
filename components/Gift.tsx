import { MediaRenderer, Web3Button, useAddress, useClaimConditions, useContract, useNFTBalance } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { GIFT_URI, NFT_CONTRACT_ADDRESS } from "../constants/constants";

type GiftProps = {
    nft: NFT;
};

export const Gift = ({ nft }: GiftProps) => {
    const address = useAddress();
    const currentDate = new Date();

    const { contract } = useContract(NFT_CONTRACT_ADDRESS);

    const { data: isOwned, isLoading: isLoadingIsOwned } = useNFTBalance(contract, address, nft.metadata.id);

    const { data: claimCondition, isLoading: isLoadingClaimCondition } = useClaimConditions(contract, nft.metadata.id);

    if(claimCondition === undefined || claimCondition.length === 0) {
        return (
            <div>
                <p></p>
            </div>
        )
    };

    const isDatePassed = claimCondition && claimCondition[0].startTime < currentDate;
    const displayGiftDay = parseInt(nft.metadata.id) + 1;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            maxWidth: "1440px",
        }}>
            <div style={{
                position: "relative",
            }}>
                {!isLoadingIsOwned && !isLoadingClaimCondition && isOwned && (
                    <>
                        <MediaRenderer
                            src={isDatePassed && isOwned.toNumber() > 0 ? nft.metadata.image : GIFT_URI}
                            style={{
                                borderRadius: "10px",
                            }}
                        />
                        <h3 style={{
                            position: "absolute",
                            top: "0px",
                            left: "20px",
                            color: "#333333",
                            fontSize: "18px",
                            fontWeight: "bold",
                            padding: "5px 10px",
                            borderRadius: "10px",
                            backgroundColor: "#FFFFFF",
                        }}>Day {displayGiftDay}</h3>
                        {address && (
                            isOwned.toNumber() > 0 ? (
                                <p style={{
                                    position: "absolute",
                                    bottom: "5px",
                                    left: "50%",
                                    transform: "translate(-50%, 0)",
                                    backgroundColor: "forestgreen",
                                    color: "lightgreen",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    borderRadius: "10px",
                                    padding: "10px",
                                    width: "80%",
                                    textAlign: "center",
                                }}>Claimed!</p>
                            ) : (
                                <Web3Button
                                    contractAddress={NFT_CONTRACT_ADDRESS}
                                    action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
                                    isDisabled={!isDatePassed || isOwned.toNumber() > 0}
                                    style={{
                                        position: "absolute",
                                        bottom: "0px",
                                        left: "0px",
                                        backgroundColor: isDatePassed ? "#FFFFFF" : "#CCCCCC",
                                        color: "#333333",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        borderRadius: "0px 0px 10px 10px",
                                        padding: "10px",
                                        width: "100%",
                                    }}
                                >{
                                    isDatePassed ? (
                                        isOwned.toNumber() > 0 ? "Gift Claimed" : "Claim Gift"
                                    ) : (
                                        claimCondition![0].startTime.toLocaleString()
                                    )
                                }</Web3Button>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    )
};