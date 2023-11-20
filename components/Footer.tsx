import React, { useState } from 'react';

const Footer: React.FC = () => {
    const donateAddress = '0xCC6261C7F9C29A1F69e4021c83AA20a02a225a84';
    const [copySuccess, setCopySuccess] = useState(false);

    const handleDonateClick = () => {
        navigator.clipboard.writeText(donateAddress);
        setCopySuccess(true);

        setTimeout(() => {
            setCopySuccess(false);
        }, 1000);
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            backgroundColor: "#01111f",
            color: "#ffffff",
        }}>
            <div>
                <p>Genome Ghain DEV </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <button
                    onClick={handleDonateClick}
                    style={{
                        backgroundColor: "#000000",
                        border: "none",
                        color: "white",
                        padding: "10px 16px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        margin: "4px 2px",
                        cursor: "pointer",
                        borderRadius: "10px",
                        boxShadow: "0 2px 4px rgba(255, 255, 255, 0.5)", 
                    }}
                >
                    Donate {donateAddress}
                </button>
                {copySuccess && <span style={{ marginLeft: '10px', color: 'green' }}>Copied!</span>}
            </div>
            <div>
                <a href="https://thirdweb.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                    Using ThirdWeb
                </a>
            </div>
        </div>
    );
};

export default Footer;
