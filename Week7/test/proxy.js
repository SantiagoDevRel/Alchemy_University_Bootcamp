const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { expect } = require("chai");
const { ethers } = require("hardhat");
  
    describe("Proxy", function () {
    
        async function deployFixture() {
        
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
    
        const Proxy = await ethers.getContractFactory("Proxy");
        const Logic1 = await ethers.getContractFactory("Logic1");
        const Logic2 = await ethers.getContractFactory("Logic2");

        const proxy = await Proxy.deploy();
        const logic1 = await Logic1.deploy();
        const logic2 = await Logic2.deploy();

        //Use the ABI from proxy.address pointint at the logic of Logic1
        const proxyAsLogic1 = await ethers.getContractAt("Logic1",proxy.address);
        const proxyAsLogic2 = await ethers.getContractAt("Logic2",proxy.address);

        return { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2  };
        }

        async function lookupUint(contractAddress, slot){

            return parseInt( await ethers.provider.getStorageAt(contractAddress, slot))
        }
        

        it("Should work with logic 1", async()=>{
            const {proxy, logic1, proxyAsLogic1} = await loadFixture(deployFixture);
            await proxy.changeImplementation(logic1.address);

            expect(await lookupUint(proxy.address,"0x0")).to.equal(0);

            await proxyAsLogic1.changeX(77);

            expect(await lookupUint(proxy.address,"0x0")).to.equal(77);

        })
    
        it("Should work with updgrade", async()=>{
            const {proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2} = await loadFixture(deployFixture);
            
            //changing implementation should not change the state variable at the proxy
            await proxy.changeImplementation(logic1.address);
            expect(await lookupUint(proxy.address,"0x0")).to.equal(0);

            //changing implementation should not change the state variable at the proxy
            await proxy.changeImplementation(logic2.address);
            expect(await lookupUint(proxy.address,"0x0")).to.equal(0)

            await proxyAsLogic2.changeX(50);
            expect(await lookupUint(proxy.address,"0x0")).to.equal(100)

            await proxyAsLogic2.tripleX();
            expect(await lookupUint(proxy.address,"0x0")).to.equal(300)

        })  
    });
  