import fs from "fs";
import { task } from "hardhat/config";
declare var ethers: any;

task("block-number", "Print the current block number").setAction(
    async (taskArgs, hre) => {
        const blockNUmber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number: ${blockNUmber}`);
    }
);

task("test-task", "Check if contract is working")
    .addParam("d", "required deploymentId")
    .setAction(async (taskArgs, hre) => {
        if (!taskArgs.d) {
            console.log("required deploymentID");
        }
        const deployedAdressesFile =
            __dirname +
            `/../ignition/deployments/${taskArgs.d}/deployed_addresses.json`;

        if (!fs.existsSync(deployedAdressesFile)) {
            console.error(
                "You need to deploy your contract first, or deployedId doesnt exist"
            );
            return;
        }

        const deployedAdressesFileJson = fs.readFileSync(deployedAdressesFile);
        const deployedAdress = JSON.parse(deployedAdressesFileJson.toString());
        const adress =
            deployedAdress[Object.getOwnPropertyNames(deployedAdress)[0]];

        const [sender] = await ethers.getSigners();
        const token = await ethers.getContractAt(
            "SimpleStorage",
            adress,
            sender
        );

        let currentFavoriteNumber = await token.retrieve();
        console.log(currentFavoriteNumber);
        console.log("Storing new value...");
        let transactionResponse = await token.store("100");
        await transactionResponse.wait();
        currentFavoriteNumber = await token.retrieve();
        console.log(currentFavoriteNumber);
    });
