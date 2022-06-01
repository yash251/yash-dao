import sdk from "./1-initialize-sdk";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x85b154BaA8716DDF4890eE35313EcDF");

(async () => {
    try {
        await editionDrop.createBatch([
            {
                name: "Yash Best Picture",
                description: "This NFT will give you access to YashDAO!",
                image: readFileSync("scripts/assets/kendall.jpeg"),
            },
        ]);
        console.log("Successfully created a new NFT in the drop!");
    }
    catch (error) {
        console.error("failed to create the new NFT", error);
    }
})();