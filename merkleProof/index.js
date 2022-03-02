const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

exports.handler = async (event) => {
    let address = event.address;
    let proof = MerkleTreeProof(address);
    const response = {
        statusCode: 200,
        body: proof,
    };
    return response;
};

function MerkleTreeProof(address) {
    // TODO implement
    let addresses = [
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000002",
        "0x136BBBB19dF52AEe9dC5eF47de19E37eEA05b7e3",
        "0x83332BCDc4f6AE70e1a6F7f933Df0b9671b610Bf",
        "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    ];

    const leaves = addresses.map((address) => keccak256(address));
    const tree = new MerkleTree(leaves, keccak256, {
        sortPairs: true,
    });
    const root = tree.getRoot().toString("hex"); //TODO: Use this when you need to get the root of the tree (For the smart contract)
    let leaf = keccak256(address);
    const hexProof = tree.getHexProof(leaf);
    return hexProof;
}
