export const INFURA_ID = "367c7782c20c417b982f27e96724e8ed";

export const NETWORKS = {
    localhost: {
      name: "localhost",
      color: "#666666",
      chainId: 31337,
      blockExplorer: "",
      rpcUrl: "http://" + window.location.hostname + ":8545",
    },
    rinkeby: {
      name: "rinkeby",
      color: "#e0d068",
      chainId: 4,
      rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
      faucet: "https://faucet.rinkeby.io/",
      blockExplorer: "https://rinkeby.etherscan.io/",
    }
}

export const NETWORK = chainId => {
    for (const n in NETWORKS) {
      if (NETWORKS[n].chainId === chainId) {
        return NETWORKS[n];
      }
    }
}

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = "M72G1HQ5A3C3YQ4DZWTNUP448R57AJPTGA";

export const REACT_APP_PROVIDER='https://dai.poa.network';

export const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"uint256","name":"ID","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"position","type":"string"},{"internalType":"string","name":"ipfs","type":"string"}],"indexed":false,"internalType":"struct Elect.candid","name":"winner","type":"tuple"},{"indexed":false,"internalType":"uint256","name":"votes","type":"uint256"}],"name":"Winner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"ID","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"position","type":"string"},{"indexed":false,"internalType":"string","name":"ipfs","type":"string"}],"name":"candidates","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"uint256","name":"ID","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"position","type":"string"},{"internalType":"string","name":"ipfs","type":"string"}],"indexed":false,"internalType":"struct Elect.candid","name":"Candid","type":"tuple"},{"indexed":false,"internalType":"uint256","name":"votes","type":"uint256"}],"name":"result","type":"event"},{"inputs":[{"internalType":"string","name":"candidate","type":"string"},{"internalType":"string","name":"position","type":"string"},{"internalType":"string","name":"link","type":"string"}],"name":"addCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"string[]","name":"accountTypes","type":"string[]"}],"name":"addStakeholders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"beginVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"candidate","type":"uint256"}],"name":"candidateVotes","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"candidate","type":"string"}],"name":"checkCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clearData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractstate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"login","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicResults","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_chairman","type":"address"}],"name":"setChairman","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"candidate","type":"uint256[]"}],"name":"voteCandidate","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"}]



