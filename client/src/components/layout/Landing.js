import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
	render() {
		return (
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="display-3 mb-4">Dreamcatcher</h1>
								<p className="lead">
									{" "}
									Connect with the dreamer community. Find out why you are the
									way you are. Talk with some of the best sleep psychologists in
									the world, and have them interpret your dreams!
								</p>
								<hr />
								<Link to="/register" className="btn btn-lg btn-dark mr-2">
									Sign Up
								</Link>
								<Link to="/login" className="btn btn-lg btn-light">
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
