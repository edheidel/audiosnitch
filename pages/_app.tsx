import { useEffect, useState } from "react";
import "./globalStyles.css";
import axios from "axios";
import Search from "../components/Search";

const App = () => {
	return (
		<div className="background-container">
			<h1>Which music style is this?</h1>
			<p>Start searching now.</p>
			<Search />
		</div>
	);
};

export default App;
