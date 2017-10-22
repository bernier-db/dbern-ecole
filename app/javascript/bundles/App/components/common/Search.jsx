import React from 'react';
import PropTypes from 'prop-types'

class Search extends React.Component {
	render() {
		return (
			<div className={this.props.SearchName}>
				<input placeholder="Search..." name={this.props.SearchName}/>
				<button type="button" className="searchIcon"> <img height="19px" src={require('../../Assets/Images/search.svg')} /></button>
			</div>
		);
	}
}

Search.propTypes = {
	SearchName: PropTypes.string.isRequired
};

export default Search;
