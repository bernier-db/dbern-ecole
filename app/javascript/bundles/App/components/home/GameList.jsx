import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router';

const GameList = (props) => {
    console.log(props);

    return (
        <div className="gameList">
        <h1>Currently played</h1>
            <div className="list">
            {props.games.length > 0 ? (props.games.map((g, idx)=>{
                return <Link className="link" to={"/games/" + g.id} key={idx}>{g.title}</Link>
            }))
            : ''}
            </div>
        </div>
    );
}

GameList.propTypes = {
    title: PropTypes.string.isRequired,
    games: PropTypes.array.isRequired
};

export default GameList;