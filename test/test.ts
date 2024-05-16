import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deploy() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        const simpleStorage = await SimpleStorage.deploy();

        return { simpleStorage, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should unset favoriteNumber", async function () {
            const { simpleStorage } = await loadFixture(deploy);

            expect(await simpleStorage.retrieve()).to.equal(0);
        });

        it("Should unset people", async function () {
            const { simpleStorage } = await loadFixture(deploy);

            expect(await simpleStorage.people.length).to.equal(+0);
        });
    });
});

describe("SimpleStorage", function () {
    // let simpleStorageFactory
    // let simpleStorage
    let simpleStorageFactory: SimpleStorage__factory;
    let simpleStorage: SimpleStorage;

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        // assert
        // expect
        assert.equal(currentValue.toString(), expectedValue);
        // expect(currentValue.toString()).to.equal(expectedValue)
    });
    it("Should update when we call store", async function () {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });

    // Extra - this is not in the video
    it("Should work correctly with the people struct and array", async function () {
        const expectedPersonName = "Patrick";
        const expectedFavoriteNumber = "16";
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber
        );
        await transactionResponse.wait(1);
        const { favoriteNumber, name } = await simpleStorage.people(0);
        // We could also do it like this
        // const person = await simpleStorage.people(0)
        // const favNumber = person.favoriteNumber
        // const pName = person.name

        assert.equal(name, expectedPersonName);
        assert.equal(favoriteNumber.toString(), expectedFavoriteNumber);
    });
});
