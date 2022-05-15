import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/credentials";

const App = () => {
	console.log("RENDERING APP...");

	const [token, setToken] = useState("");
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		axios("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
			},
			data: "grant_type=client_credentials",
		}).then((tokenResponse) => {
			setToken(tokenResponse.data.access_token);

			axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
				method: "GET",
				headers: { Authorization: "Bearer " + token },
			}).then((genreResponse) => {
				setGenres(genreResponse.data.categories.items);
			});
		});
	}, []);

	console.log(genres);

	return (
		<Layout>
			<h1>Hi, Marco! 👋</h1>
		</Layout>
	);
};

export default App;
