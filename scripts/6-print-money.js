import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x59FA0EF3ef73C76eAC063C5F2D9e787849Ddc3d4");

(async () => {
    try {
        const amount = 10000000;
        await token.mintToSelf(amount);
        const totalSupply = await token.totalSupply();
        
        console.log("There now is ", totalSupply.displayValue, "$YASH in circulation");
    }
    catch (error) {
        console.error("Failed to print money", error);
    }
})();