import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types'

class GameDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            game: {},
            players: [],
        }
    }


    componentWillMount() {
        if (this.props.checkIfHasGame())
            return;
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
                    });
                }
            }
        });
    }


    render() {
        return (this.state.loading ? 'loading...' : (
                <div className="flex">
                    <div className="flex-fixed-400">

                        <h2 style={{marginBottom: '5px'}}>{this.state.game.title}</h2>

                        <div style={{
                            width: '300px',
                            minHeight: '60px',
                        }}>
                            <img style={{width: '100%'}} src={"/assets/" + this.state.game.image}/>
                        </div>
                        <h2 style={{marginTop: '20px'}}>Description</h2>
                        <div className="rect-section">
                            {this.state.game.description}
                        </div>
                    </div>

                    <div className="flex-fixed-400">
                        {this.state.players.length > 0 &&
                        <h2>Currently playing ({this.state.players.length})</h2>}
                    {this.state.players.length > 0 &&
                        <div className="rect-section listing">
                            {this.state.players.map((pl, idx) => {
                                return (
                                    <div key={idx} className="listing-item">
                                        <Link className="link" to={'/users/' + pl.id}>{pl.prenom + ' ' + pl.nom}</Link>
                                    </div>
                                );
                            })}
                        </div>}

                        {this.props.isLogged ? (
                            <button className="play clickable" onClick={() => {
                                this.props.redirect("/games/play/" + this.state.game.id)
                            }}>Play {this.state.game.title} now!</button>
                        ) : (
                            <button className="play clickable" onClick={() => {
                                this.props.redirect("/sign_in")
                            }}>Login to play</button>
                        )}
                    </div>


                </div>
            )
        );
    }
}

GameDetailPage.propTypes = {};

export default GameDetailPage;