import Head from "next/head";
import { useState } from "react";
import Script from "next/script";
import StakingHeader from "../components/StakingHeader.jsx";
import StakingMain from "../components/StakingMain.jsx";
import Footer from "../components/Footer.jsx";
import useFetchNFTs from "../hooks/use-fetch-NFTs.js";

//-----------------------------
export default function Staking({
	scriptAddress,
	cryptoTowerAddress,
	loadingCubesAddress,
}) {
	const [address, setAddress] = useState("0xaD87a8a48E59B1448Dc2317FD7886f2d89132b71");
	// fetch data handler
	const { data, isInHome, isLoading, fetchNFTs } = useFetchNFTs(address);
	//
	return (
		<wholepage
			className={`container m-auto flex  min-h-screen flex-col px-6 text-center sm:px-10 md:px-20 ${
				data !== [] ? "justify-evenly" : "justify-between"
			} `}
		>
			<Script src={scriptAddress} />
			<Head>
				<title>GDX Staking Service</title>
				<meta
					name="GDX Staking Service"
					content="A simple dApp for Staking NFT"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<StakingHeader {...{ address, setAddress, fetchNFTs }} />
			<StakingMain
				{...{
					data,
					isInHome,
					isLoading,
					scriptAddress,
					cryptoTowerAddress,
					loadingCubesAddress,
				}}
			/>
			<Footer />
		</wholepage>
	);
}

//  --------------------------------
export function getStaticProps() {
	// async/await testing!
	let scriptAddress =
		"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";

	let cryptoTowerAddress =
		//"https://assets3.lottiefiles.com/packages/lf20_2omr5gpu.json";
		"https://assets3.lottiefiles.com/packages/lf20_4HwMFcslUL.json";
		
	let loadingCubesAddress =
		"https://assets4.lottiefiles.com/private_files/lf30_c52paxfj.json";

	return {
		props: {
			scriptAddress,
			cryptoTowerAddress,
			loadingCubesAddress,
		},
	};
}
