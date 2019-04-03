import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";
import { GridList, GridListTile } from "@material-ui/core";

// const styles = theme => ({
// 	root: {
// 		display: "flex",
// 		flexWrap: "wrap",
// 		justifyContent: "space-around",
// 		overflow: "hidden"
// 	}
// });

class Profiles extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}

	render() {
		const { profiles, loading } = this.props.profile;
		//const { classes } = this.props;
		let profileItems;

		if (profiles === null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map(profile => {
					return (
						<GridListTile key={profile._id} cols={profile.cols || 1}>
							<ProfileItem key={profile._id} profile={profile} />
						</GridListTile>
					);
				});
			} else {
				profileItems = <h4>No profiles found...</h4>;
			}
		}
		return (
			<div className="profiles">
				<h1 className="display-4 text-center">
					Psychologists
					<p className="lead text-center">
						Connect with these top psychologists!
					</p>
				</h1>

				<GridList cols={3} cellHeight="auto">
					{profileItems}
				</GridList>
			</div>
		);
	}
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
	//classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,

	{ getProfiles }
)(Profiles);

// withStyles(styles),
// <div className={classes.root}>
// </div>
