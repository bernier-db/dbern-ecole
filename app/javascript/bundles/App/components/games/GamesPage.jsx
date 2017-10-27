import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router'
class GamesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    componentWillMount() {
        $.ajax({
            method: "get",
            url: "/games/getAllGames",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            success: (res) => {
                this.setState({
                    games: res.games
                });
            }
        });
    }

    render() {
        let index = '';
        let result = '';
        let arr = [];

        this.state.games.forEach((game, idx) => {
            if (game.title.charAt(0).toUpperCase() !== index) {
                index = game.title.charAt(0).toUpperCase();
                arr.push({index: index, games: []});
                arr[arr.length - 1].games.push(game);
            } else {
                arr[arr.length - 1].games.push(game);
            }
        });
        console.log(arr);


        return (<div className={"flex wrap"}>
            {arr.map((section, idx1) => {
                return (
                    <div className={"index-section flex column flex-fixed-400"} key={idx1}>
                        <div className="index">{section.index}</div>
                        {section.games.map((g, idx2) => {
                            return (<Link to={"/games/" + g.id} className={"game-title link"} key={idx2}>{g.title}</Link>);
                        })}
                    </div>
                );
            })}
        </div>);


    }
}

GamesPage.propTypes = {};

export default GamesPage;
