import React from 'react';
import PropTypes from 'prop-types';
import GameCarousel from "./GameCarousel";
import GameList from "./GameList";

// import fetch from 'whatwg-fetch';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: {
                latest: [],
                mostPopulars: [],
                currentlyPlayed: []
            },
            gamesLoaded: false
        }
    }

    componentDidMount() {
        fetch('/getData').then((res) => {
            console.log('Fetched : ');
            res.json().then((a) => {
                console.log(a);
                this.setState({
                    games: {
                        currentlyPlayed: a.current,
                        mostPopulars: a.popular,
                        latest: a.latest
                    },
                    gamesLoaded: true
                });
            });
        });
    }

    render() {
        return (
            <div>
                {!this.state.gamesLoaded ?
                    (
                        <div>loading...</div>
                    ) :
                    (<div style={{position: "relative"}}>
                            <GameCarousel games={this.state.games.latest} category={"Latest Games"}/>
                            <GameCarousel games={this.state.games.mostPopulars} category={"Most popular"}/>
                            <GameList title={"Currently played"} games={this.state.games.currentlyPlayed} />
                        </div>
                    )
                }
            </div>
        );
    }
}

HomePage.propTypes = {};

export default HomePage;
