import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
	clearCurrentProfile,
	getCurrentProfile
} from "../../actions/profileActions";
//import Spinner from "../common/Spinner";

class Navbar extends Component {
	onLogoutClick(e) {
		e.preventDefault();
		this.props.clearCurrentProfile();
		this.props.logoutUser();
	}

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	render() {
		// Add user for avatar
		const { isAuthenticated } = this.props.auth;
		//const { profile, loading } = this.props.profile;
		//let authLinks;
		/*if (profile === null || loading) {
			authLinks = <Spinner width="8px" margin="auto" display="block" />;
		} else {*/
		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">
						Dashboard
					</Link>
				</li>
				{/*
					<li className="nav-item">
						<Link className="nav-link" to={`/profile/${profile.handle}`}>
							My Profile
						</Link>
					</li>
					*/}
				<li className="nav-item">
					{/* eslint-disable-next-line*/}
					<a
						href="#"
						onClick={this.onLogoutClick.bind(this)}
						className="nav-link"
						to="/login"
					>
						{/*			<img
							className="rounded-circle"
							src={user.avatar}
							alt={user.name}
							style={{ width: "25px", marginRight: "5px" }}
							title="Placeholder"
			/>*/}
						Logout
					</a>
				</li>
			</ul>
		);
		//}
		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Sign Up
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
			</ul>
		);

		return (
			<nav className="navbar navbar-expand-sm navbar-light text-white bg-light mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">
						Dreamcatcher
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/profiles">
									{" "}
									Psychologists
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/feed">
									{" "}
									Dream Feed
								</Link>
							</li>
						</ul>
						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ logoutUser, clearCurrentProfile, getCurrentProfile }
)(Navbar);
