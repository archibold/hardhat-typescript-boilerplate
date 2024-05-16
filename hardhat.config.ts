import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-gas-reporter";
import "./tasks/test";
import "solidity-coverage";

const {
    ALCHEMY_API_KEY = "",
    PRIVATE_KEY = "",
    ETHERSCAN_API_KEY = "",
    COINMARKETCAP_API_KEY = "",
} = process.env;

const config: HardhatUserConfig = {
    solidity: "0.8.24",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [PRIVATE_KEY],
            allowUnlimitedContractSize: true,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-reports.txt",
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
};

export default config;
