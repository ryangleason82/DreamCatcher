import React from "react";

export default function Footer() {
	return (
		<footer className="bg-light text-black mt-5 p-4 text-center">
			Copyright &copy; {new Date().getFullYear()} Gleason Group
		</footer>
	);
}
