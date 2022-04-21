import { useState } from 'react';


const Landing = ({handleSignIn}) => {

    // const connectWallet = async (router) => {
	// 	const providerOptions = {
	// 		walletconnect: {
	// 			package: WalletConnectProvider, // required
	// 			options: {
	// 				infuraId: process.env.NEXT_PUBLIC_INFURA_APP_ID,
	// 			},
	// 		},
	// 	};
	// 	const web3Modal = new Web3Modal({
	// 		theme: 'dark',
	// 		network: 'mainnet', // optional
	// 		cacheProvider: true, // optional
	// 		providerOptions, // required
	// 		//disableInjectedProvider: false
	// 	});
	// 	try {
	// 		const provider = await web3Modal.connect();

	// 		const web3 = new Web3(provider);

	// 		//  Get Accounts
	// 		const accounts = await web3.eth.getAccounts();

	// 		if (accounts.length > 0) {
	// 			//Get Balance
	// 			let balance;
	// 			await web3.eth.getBalance(`${accounts[0]}`, function (err, result) {
	// 				if (err) {
	// 					dispatch({
	// 						type: ERROR,
	// 						payload: err.message,
	// 					});
	// 				} else {
	// 					balance = convertToEther(web3, result);
	// 				}
	// 			});
	// 			dispatch({
	// 				type: CONNECT_WALLET,
	// 				payload: {
	// 					balance,
	// 					accounts,
	// 					web3,
	// 					web3Modal,
	// 					providerOptions,
	// 					provider,
	// 				},
	// 			});
	// 			localStorage.setItem('isWalletConnected', 'true');
	// 			localStorage.setItem('count', '1');
	// 			loadContract(web3);
	// 			router.push('/dashboard');
	// 		}
	// 	} catch (error) {
	// 		dispatch({
	// 			type: ERROR,
	// 			payload: (error as Error).message,
	// 		});
	// 	}
	// };

	// //Load Contract
	// const loadContract = async (web3: any) => {
	// 	try {
	// 		const contract = new web3.eth.Contract(
	// 			NFTJson,
	// 			`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`
	// 		);
	// 		dispatch({
	// 			type: LOAD_CONTRACT,
	// 			payload: contract,
	// 		});
	// 	} catch (error) {
	// 		dispatch({
	// 			type: ERROR,
	// 			payload: (error as Error).message,
	// 		});
	// 	}
	// };

	// //Upload File
	// const uploadFile = async (
	// 	contract: any,
	// 	path: string,
	// 	fileName: string,
	// 	date: string,
	// 	address: string,
	// 	isPrivate: boolean
	// ) => {
	// 	try {
	// 		await contract.methods.uploadFile(path, fileName, date, isPrivate).send({
	// 			from: address,
	// 		});

	// 		const res = await contract.methods.retrieveFiles().call();
	// 		let items: any = [];
	// 		res.map((dat: any) => {
	// 			let item: any = {};
	// 			item.CID = dat.CID;
	// 			item.fileName = dat.fileName;
	// 			item.id = dat.id;
	// 			item.isPrivate = dat.isPrivate;
	// 			item.sharedWith = dat.sharedWith;
	// 			item.uploadDate = dat.uploadDate;
	// 			item.uploadedBy = dat.uploadedBy;
	// 			items.push(item);
	// 		});

	// 		dispatch({
	// 			type: UPLOAD_FILE,
	// 			payload: items.reverse(),
	// 		});
	// 	} catch (error) {
	// 		dispatch({
	// 			type: ERROR,
	// 			payload: (error as Error).message,
	// 		});
	// 	}
	// };

	// //Fetch files
	// const fetchFiles = async (contract: any) => {
	// 	try {
	// 		const res = await contract.methods.retrieveFiles().call();
	// 		let items: any = [];
	// 		res.map((dat: any) => {
	// 			let item: any = {};
	// 			item.CID = dat.CID;
	// 			item.fileName = dat.fileName;
	// 			item.id = dat.id;
	// 			item.isPrivate = dat.isPrivate;
	// 			item.sharedWith = dat.sharedWith;
	// 			item.uploadDate = dat.uploadDate;
	// 			item.uploadedBy = dat.uploadedBy;
	// 			items.push(item);
	// 		});

	// 		dispatch({
	// 			type: FETCH_FILES,
	// 			payload: items.reverse(),
	// 		});
	// 	} catch (error) {
	// 		dispatch({
	// 			type: ERROR,
	// 			payload: (error as Error).message,
	// 		});
	// 	}
	// };
	// //Privatize file
	// const privatizeFiles = async (contract: any, address: string, id: any) => {
	// 	try {
	// 		await contract.methods.privatizeFile(id).send({
	// 			from: address,
	// 		});
	// 		const res = await contract.methods.retrieveFiles().call();
	// 		let items: any = [];
	// 		res.map((dat: any) => {
	// 			let item: any = {};
	// 			item.CID = dat.CID;
	// 			item.fileName = dat.fileName;
	// 			item.id = dat.id;
	// 			item.isPrivate = dat.isPrivate;
	// 			item.sharedWith = dat.sharedWith;
	// 			item.uploadDate = dat.uploadDate;
	// 			item.uploadedBy = dat.uploadedBy;
	// 			items.push(item);
	// 		});

	// 		dispatch({
	// 			type: PRIVATIZE_FILE,
	// 			payload: items.reverse(),
	// 		});
	// 	} catch (error) {
	// 		dispatch({
	// 			type: ERROR,
	// 			payload: (error as Error).message,
	// 		});
	// 	}
	// };
	// //Publicize file
	// const publicizeFiles = async (contract: any, address: string, id: any) => {
	// 	try {
	// 		await contract.methods.publicizeFile(id).send({
	// 			from: address,
	// 		});
	// 		const res = await contract.methods.retrieveFiles().call();
	// 		let items: any = [];
	// 		res.map((dat: any) => {
	// 			let item: any = {};
	// 			item.CID = dat.CID;
	// 			item.fileName = dat.fileName;
	// 			item.id = dat.id;
	// 			item.isPrivate = dat.isPrivate;
	// 			item.sharedWith = dat.sharedWith;
	// 			item.uploadDate = dat.uploadDate;
	// 			item.uploadedBy = dat.uploadedBy;
	// 			items.push(item);
	// 		});

	// 		dispatch({
	// 			type: PUBLICIZE_FILE,
	// 			payload: items.reverse(),
	// 		});
	// 	} catch (error) {
	// 		dispatch({
	// 			type: ERROR,
	// 			payload: (error as Error).message,
	// 		});
	// 	}
	// };

	// //Share file
	// const shareFile = async (
	// 	contract: any,
	// 	id: any,
	// 	address: string,
	// 	userAddress: string
	// ) => {
	// 	try {
	// 		await contract.methods.shareFile(id, userAddress).send({
	// 			from: address,
	// 		});
	// 	} catch (error) {
	// 		dispatch({
	// 			type: ERROR,
	// 			payload: (error as Error).message,
	// 		});
	// 	}
	// };

	// //Clear Error
	// const clearError = () => {
	// 	dispatch({
	// 		type: CLEAR_ERROR,
	// 	});
	// };

	// //Clear Message
	// const clearMessage = () => {
	// 	dispatch({
	// 		type: CLEAR_MESSAGE,
	// 	});
	// };

	// //Disconnect wallet
	// const disconnectWallet = async (modal: any, router: any) => {
	// 	modal.clearCachedProvider();
	// 	dispatch({
	// 		type: DISCONNECT_WALLET,
	// 	});
	// 	localStorage.removeItem('isWalletConnected');
	// 	localStorage.removeItem('count');
	// 	router.push('/');
	// };

	// //Monitor disconnect
	// const monitorDisconnect = async (provider: any) => {
	// 	// Subscribe to session disconnection
	// 	provider.on('disconnect', (code: number, reason: string) => {
	// 		dispatch({
	// 			type: MONITOR_DISCONNECT,
	// 			payload: reason,
	// 		});
	// 		localStorage.removeItem('isWalletConnected');
	// 		localStorage.removeItem('count');
	// 	});
	// };
	// //Monitor account changed
	// const monitorAccountChanged = async (provider: any) => {
	// 	// Subscribe to accounts change
	// 	provider.on('accountsChanged', (accounts: string[]) => {
	// 		dispatch({
	// 			type: MONITOR_ACCOUNT_CHANGED,
	// 		});
	// 		localStorage.removeItem('isWalletConnected');
	// 		localStorage.removeItem('count');
	// 	});
	// };

    return (
        <div className= "landing-page">
            <h1> Welcome to G-DAO Voting</h1>
            <p> Sign in now to vote for your next parliament Leaders</p>
            <button className= "button-auth" onClick= {handleSignIn}>
                Sign In
            </button>
        </div>
        
    )

}

export default Landing;