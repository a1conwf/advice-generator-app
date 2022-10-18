import React from "react";
import {useState, useEffect} from "react";

//Style
import "./Advice.scss";

//Images
import divider from "../../assets/pattern-divider-desktop.svg";
import dice from "../../assets/icon-dice.svg";

const Advice = () => {
	const [isClicked, setIsClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [advice, setAdvice] = useState({});

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			fetch("https://api.adviceslip.com/advice")
				.then((res) => {
					if (!res.ok) {
						throw new Error("Error while fetching data from this resource");
					}
					return res.json();
				})
				.then((data) => {
					const adviceId = data.slip.id;
					const adviceText = data.slip.advice;
					setAdvice({id: adviceId, text: adviceText});
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}, 2000);
	}, [isClicked]);

	return (
		<>
			{isLoading ? (
				<div className="loader" />
			) : (
				<section className="advice">
					<h1 className="advice__title">Advice #{advice.id}</h1>
					<p className="advice__text">“{advice.text}”</p>
					<img src={divider} alt="divider-img" className="advice__divider" />
					<button className="advice__dice" onClick={() => setIsClicked(!isClicked)}>
						<img src={dice} alt="dice-img" className="advice__dice-img" />
					</button>
				</section>
			)}
		</>
	);
};

export default Advice;
