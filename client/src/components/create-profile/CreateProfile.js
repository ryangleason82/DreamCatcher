import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: "",
			status: "",
			bio: "",
			fitbitusername: "",
			twitter: "",
			facebook: "",
			instagram: "",
			errors: {}
		};
		//this.onChange = this.onChange.bind(this);
		//this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit = e => {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			status: this.state.status,
			bio: this.state.bio,
			fitbitusername: this.state.fitbitusername,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			instagram: this.state.instagram
		};
		this.props.createProfile(profileData, this.props.history);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="Instagram Profile URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			);
		} else {
		}

		const options = [
			{
				label: "* Tell Us Why You Are Here",
				value: 0
			},
			{
				label: "I am a dreamer with crazy dreams that need interpreting",
				value: "Dreamer"
			},
			{
				label:
					"I am a psychologist who can help people understand their dreams",
				value: "Psychologist"
			}
		];

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="lead text-center">
								Let's get some information to help us understand who you are
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL"
								/>
								<SelectListGroup
									placeholder="* Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
								/>
								<TextAreaFieldGroup
									placeholder="Bio"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little bit about yourself. You don't have to if you don't want to, but it'd be nice to get to know you a bit"
								/>
								<TextFieldGroup
									placeholder="Fitbit Username"
									name="fitbitusername"
									value={this.state.fitbitusername}
									onChange={this.onChange}
									error={errors.fitbitusername}
									info="Help us gain some insight into how you sleep each night. Find more information about this here"
								/>

								<div className="mb-3">
									<button
										type="button"
										onClick={() => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}));
										}}
										className="btn btn-light"
									>
										Add Social Network Links
									</button>
									<span className="text-muted"> Optional</span>
								</div>
								{socialInputs}
								<input
									type="submit"
									value="Submit"
									className="btn btn-light btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(CreateProfile));
