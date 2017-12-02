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
            html: null,
        };
        this.startGame = this.startGame.bind(this);
        this.forfeit = this.forfeit.bind(this);
        this.fetchGameHtml = this.fetchGameHtml.bind(this);
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
                    }, this.fetchGameHtml);
                }
            }
        });
    }

    componentDidUpdate() {
        // this runs the contents in script tag on a window/global scope
        let html = this.state.html;
        if (html !== null && !canvas) {
            canvas = document.getElementById("game");
            CTX = canvas.getContext("2d");

            HEIGHT = canvas.height;
            WIDTH = canvas.width;
            this.startGame();
        }
    }

    fetchGameHtml() {
        $.ajax({
            method: "get",
            url: '/assets/memoDeck.html',
            success: (res) => {

                this.setState({
                    html: res,
                });
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

                    let gameD = JSON.parse(res.data.game_data);
                    user_id = res.myId;
                    isHost = (res.state == 'hosting' || res.data.owner_id == res.myId);
                    userPlayingOnLoad = res.data.waiting_for_user_id;
                    joustId = res.data.id;
                    gameData = gameD.coins == undefined ? gameData : gameD;
                    gameData.opponent_id = user_id;
                    gameData.owner_id = res.owner_id;
                    game = new Main();
                    game.start();

                    if(res.state == "already playing") {
                        gameData = gameD;
                        gameData.opponent_id = res.data.opponent_id;
                        gameData.owner_id = res.data.owner_id;

                        for (let i = 0; i < gameD.gameStack.length; i++) {
                            let card = gameD.gameStack[i];
                            gameStack[i] = CardManager.getSpecific(card.playerId, card.dir, card.dist);
                        }


                    }
                }
            }
        });
    }

    forfeit() {
        const game_id = this.props.params.id;
        $.ajax({
            method: "post",
            url: "/games/forfeit/" + this.state.gameData.id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            success: (res) => {
                if (res.ok) {
                    gameData = {};
                    if (!this.props.checkIfHasGame()) {
                        this.props.redirect("/games/infos/  " + this.state.gameData.game_id);
                    }
                }
            }
        });
    }

    render() {
        return (
            <div>
                <h2>{this.state.game.title}</h2>
                <div className={"flex"}>
                    <div className="playGameContainer">
                        {this.state.html !== null ? <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
                            : null}

                        <div>
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
                            <button className={"forfeit clickable"} onClick={this.forfeit}>Forfeit</button>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

GamePlayingPage.propTypes = {
    isLogged: PropTypes.bool,
    user: PropTypes.object,
};

export default GamePlayingPage;