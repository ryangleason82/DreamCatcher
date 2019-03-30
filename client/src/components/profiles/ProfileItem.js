import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import classnames from "classnames";
import {
	Card,
	CardHeader,
	Avatar,
	IconButton,
	CardContent,
	Typography,
	CardMedia,
	CardActions,
	Collapse,
	Menu
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
	card: {
		maxWidth: 300,
		maxHeight: 900,
		marginBottom: 3
	},
	media: {
		height: 0,
		paddingTop: "56.25%" // 16:9
	},
	actions: {
		display: "flex"
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	avatar: {
		backgroundColor: grey[400]
	}
});

class ProfileItem extends Component {
	state = { expanded: false, anchor: null };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	moreVertClick = e => {
		this.setState({ anchor: e.currentTarget });
	};
	moreVertClose = () => {
		this.setState({ anchor: null });
	};

	render() {
		const { profile } = this.props;
		const { classes } = this.props;
		const { anchor } = this.state;

		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Avatar aria-label="Photo" className={classes.avatar}>
							P
						</Avatar>
					}
					action={
						<div>
							<IconButton
								aria-owns={anchor ? "simple-menu" : undefined}
								aria-haspopup="true"
								onClick={this.moreVertClick}
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="simple-menu"
								anchor={anchor}
								open={Boolean(anchor)}
								onClose={this.moreVertClose}
							>
								<MenuItem onClick={this.moreVertClose}>
									{<Link to={`/profile/${profile.handle}`}>View Profile</Link>}
								</MenuItem>
							</Menu>
						</div>
					}
					title={profile.user.name}
					subheader="Professional Psychologist"
				/>
				<CardMedia
					className={classes.media}
					image={profile.user.avatar}
					title="Profile picture"
				/>
				<CardContent>
					<Typography component="p">Click to see more info</Typography>
				</CardContent>
				<CardActions className={classes.actions} disableActionSpacing>
					<IconButton aria-label="Add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="Share">
						<ShareIcon />
					</IconButton>
					<IconButton
						className={classnames(classes.expand, {
							[classes.expandOpen]: this.state.expanded
						})}
						onClick={this.handleExpandClick}
						aria-expanded={this.state.expanded}
						aria-label="Show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>Biography:</Typography>
						<Typography paragraph>
							{isEmpty(profile.bio) ? null : <span>{profile.bio}</span>}
						</Typography>
					</CardContent>
				</Collapse>
			</Card>
		);
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,

	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileItem);

/* <div className="card card-body bg-light mb-3">
<div className="row">
    <div className="col-2">
        <img src={profile.user.avatar} alt="" className="rounded-circle" />
    </div>
    <div className="col-lg-6 col-md-4 col-8">
        <h3>{profile.user.name}</h3>
        <p>{isEmpty(profile.bio) ? null : <span>{profile.bio}</span>}</p>
        <Link to={`/profile/${profile.handle}`} className="btn btn-info">
            View Profile
        </Link>
    </div>
</div>
</div> */
