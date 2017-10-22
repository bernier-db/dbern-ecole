import React from 'react';
import PropTypes from 'prop-types';

const Slogan = (props) => {
	let sentence = "...get lost";
	if (props.userName != "") sentence = sentence + ", " + props.userName;

	const style = {
		color: '#B3B3B3'
	};

	return (
		<span style={style}>{sentence}. In a game!</span>
	);
};

Slogan.propTypes = {
	userName: PropTypes.string.isRequired
};

export default Slogan;
