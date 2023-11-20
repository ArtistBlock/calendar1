import { ConnectWallet } from "@thirdweb-dev/react";
import { FaTwitter, FaTelegram, FaLinkedin } from 'react-icons/fa';
import styles from './Navbar.module.css'; 

interface SocialIconProps {
    Icon: React.ElementType;
    link: string;
    alt: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ Icon, link, alt }) => (
    <a href={link} target="_blank" rel="noopener noreferrer">
        <Icon alt={alt} style={{ marginRight: "20px", width: "30px", height: "30px", color: "white" }} />
    </a>
);

export const Navbar: React.FC = () => {
    return (
        <div className={styles.navbar}>
            <h1>NFT Calendar</h1>
            <h3 className={styles.info}>24h/Free</h3>
            <div className={styles.socialIcons}>
                <SocialIcon Icon={FaTwitter} link="https://twitter.com/GenGhain" alt="Twitter" />
                <SocialIcon Icon={FaTelegram} link="https://t.me/genchain" alt="Telegram" />
                <SocialIcon Icon={FaLinkedin} link="https://www.linkedin.com/company/genchain" alt="LinkedIn" />
            </div>
            <ConnectWallet
                btnTitle="Login"
                theme={"dark"}
                modalSize={"wide"}
                welcomeScreen={{
                    img: {
                        src: "https://pbs.twimg.com/profile_images/1716097564712304640/SgLFvIHq_400x400.jpg",
                        width: 150,
                        height: 150,
                    },
                }}
                modalTitleIconUrl={
                    "https://pbs.twimg.com/profile_images/1716097564712304640/SgLFvIHq_400x400.jpg"
                }
            />
        </div>
    );
};
