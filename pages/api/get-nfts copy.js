import { Network, Alchemy } from "alchemy-sdk";


//import Caver from "caver-js";
import CaverExtKAS from "caver-js-ext-kas";
import { json } from "mocha/lib/reporters";
//import { calculateOverrideValues } from "next/dist/server/font-utils";


// ----------------------------
const alchemy = new Alchemy({
	apiKey: process.env.API_KEY,
	network: Network.ETH_MAINNET,
});


const chainId = "8217";
const accessKeyId = "KASK7LN9R0ADR0L3SP4GVN79";
const secretAccessKey = "pam2QVYUTV1iqL77sxBbTSKsBHc2ZPw6mFUHScFm";
// Set an authorization through 'caver.initKASAPI' function
const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);


/*
export default async function handler(req, res) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({
				message: "Invalid method",
			});
		}
		const { wallet } = req.query;
		const results = await alchemy.nft.getNftsForOwner(wallet);
		res.json({ message: "Fetch successful!", data: results });

		const blockNumber = await caver.rpc.klay.getBlockNumber();
		console.log(blockNumber);


	} catch (err) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
}
*/



export default async function handler(req, res) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({
				message: "Invalid method",
			});
		}

		const { wallet } = req.query;

		console.log(wallet);


		const contractAddress = '0xf57255329ad3f60b19cb452b68546e11f1fe20df';
		const ownerAddress = '0x73d4dbc43b95cf2290b6f90c4d7a4bac22658e24';
		const query = {
			size: 1000,
			cursor: 'PdOALgqNme5a9vJ6KDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
		};

		console.log(query);

		//const data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, ownerAddress, query);
		const data = await caver.kas.tokenHistory.getNFTList(contractAddress, query);
		
		// error !!!!!!
		//const data = await caver.kas.kip17.getTokenListByOwner(contractAddress, ownerAddress); 
	
		console.log(data);




		const ownedNfts = new Array();

		for(let idx=0; idx < data.items.length; idx++){
		

			console.log(data.items[idx]);

			const nft = new Object();

			try {
				const response = await fetch(data.items[idx].tokenUri);

				//console.log(response);

				

				if (response.ok) {

					const data = await response.json();

					console.log(data.name);
					console.log(data.image);


					const media = new Array() ;
			
						
					// 객체 생성
					const mediadata = new Object() ;
					
					mediadata.gateway = data.image;
					
					// 리스트에 생성된 객체 삽입
					media.push(mediadata);


					nft.title = data.name;
					nft.tokenId = data.tokenId;

					nft.media = media;

					const contract = new Object();
					contract.address = "0x06c3afb91acd3e383795441f30ca39780fab65a6";
					contract.name = "Skell Yeah";


					nft.contract = contract;

					ownedNfts.push(nft);

			
				}
			
			} catch (err) {
				//alert("There was an error fetching NFTs!");
				//return;
				console.log(err);
			}


		}

		const aaa = new Object();

		aaa.ownedNfts = ownedNfts;

		//console.log(JSON.stringify(aaa));

		/*

		const results = ownedNfts;


		console.log(JSON.stringify(results));
		*/



		/*
		{
contract: [Object],
tokenId: '1845',
tokenType: 'ERC721',
title: 'Skell Yeah #1845',
description: "They're rowdy little punks, got no respect! Try to shut 'em down, you're gonna get decked! They do what they want, get out of their way! Skell Yeah is here and they're here to stay!",
timeLastUpdated: '2022-07-03T21:13:06.035Z',
metadataError: undefined,
rawMetadata: [Object],
tokenUri: [Object],
media: [Array],
spamInfo: undefined,
balance: 1
}
		*/



	
		
		//const results = await alchemy.nft.getNftsForOwner(wallet);
		//console.log(JSON.stringify(results));
		


		//res.json({ message: "Fetch successful!", data: results });

		const fs = require('fs');
		fs.writeFileSync('./' + contractAddress + '.json', JSON.stringify(data));
		

		res.json({ message: "Fetch successful!", data:  aaa});

	} catch (err) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
}


