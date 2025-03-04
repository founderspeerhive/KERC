require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "../admin/.env.local" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: process.env.INFURA_HTTPS_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
