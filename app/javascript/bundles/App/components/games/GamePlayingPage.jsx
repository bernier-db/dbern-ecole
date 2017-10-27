import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router';

class GamePlayingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: {},
            gameData: {},
            opponent: undefined,
            unregisterLeaveHook: undefined,
        };
        this.startGame = this.startGame.bind(this);
    }

    componentWillMount() {
        if (!this.props.isLogged) {
            this.props.redirect("/sign_in");
            return;
        }
        const game_id = this.props.params.id;
        $.ajax({
            method: "get",
            url: '/games/details/' + game_id,
            success: (res) => {
                if (res.ok) {
                    this.setState({
                        game: res.data,
                        loading: false,
                        players: res.players,
                    }, this.startGame());
                }
            }
        });
    }

    startGame() {
        const game_id = this.props.params.id;
        $.ajax({
            method: "post",
            url: "/games/play/start/" + game_id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            success: (res) => {
                if (res.ok) {
                    this.setState({
                        opponent: res.opponent,
                        gameData: res.data,
                    });
                }
            }
        });
    }

    render() {
        return (
            <div>
                <h2>{this.state.game.title}</h2>
                <div className="playGameContainer">
                    <canvas></canvas>
                </div>
                {this.state.opponent == undefined ?
                    (<span>Waiting for an opponent</span>) :
                    (<span>
                            Playing with:
                            <Link className="link"
                                  to={"/users/" + this.state.opponent.id}>
                                {this.state.opponent.prenom + ' ' + this.state.opponent.nom}
                            </Link>
                        </span>
                    )}
            </div>
        );
    }
}

GamePlayingPage.propTypes = {
    isLogged: PropTypes.bool,
    user: PropTypes.object,
};

export default GamePlayingPage;