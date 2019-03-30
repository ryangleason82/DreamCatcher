import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

const MoreVertMenu = items => {
	const menuItems = items.map(item => (
		<item key={item.label} value={item.value}>
			{item.label}
		</item>
	));

	state = { anchor: null };
	const { profile } = this.props;
	const { anchor } = this.state;
	return (
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
	);
};

MoreVertMenu.propTypes = {
	profile: PropTypes.object.isRequired
};

export default MoreVertMenu;
