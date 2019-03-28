import React from "react";
import spinner from "./spinner.gif";

export default () => {
	return (
		<div>
			<img
				src={spinner}
				style={{ width: "200px", margin: "auto", display: "block" }}
				alt="Loading..."
			/>
		</div>
	);
};

/*
const Spinner = ({ width, margin, display }) => {
	const spinnerStyle = {
		width: { width },
		margin: { margin },
		display: { display }
	};
	return (
		<div>
			<div>{console.log(width)}</div>
			<img src={spinner} alt="Loading..." style={spinnerStyle} />
		</div>
	);
};

export default Spinner;

width="20px" margin="auto" display="block"
*/
