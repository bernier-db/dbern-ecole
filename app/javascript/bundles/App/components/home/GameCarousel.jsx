import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

class GameCarousel extends React.Component {


    render() {

        return (
            <div className="gameCaroussel">
                <h1>{this.props.category}</h1>
                    <div className="gamesContainer">
                        {this.props.games.map((g, idx)=>{
                        return(
                            <div className="singleGame" key={idx}>
                                <div className="imgContainer">
                                    <img src={'/assets/' + g.image}/>
                                    <div className="imgHover">Play</div>
                                </div>

                                <div className="gameName">
                                    <Link to={"/games/infos/" + g.id}>{g.title}</Link>
                                </div>
                            </div>);

                        })}


                    </div>
            </div>
        );
    }
};
GameCarousel.propTypes = {
    games: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired
};

export default GameCarousel;