import React from 'react';
import PropTypes from 'prop-types';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            gameStats: {
                fetched: false
            },
            editingInfo: false,
            editingPassword: false,
            infoMessageType: 'success',
            displayInfoMsg: false,
            infoSent: false,
            infoMsg: ""
        };
        this.submitInfo = this.submitInfo.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.toggleEditInfo = this.toggleEditInfo.bind(this);
        this.onPrenomChange = this.onPrenomChange.bind(this);
        this.onNomChange = this.onNomChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onCancelInfo = this.onCancelInfo.bind(this);
    }

    submitInfo(e) {
        e.preventDefault();
        this.setState({infoSent:true});
        $.ajax({
            method: "PATCH",
            url: "/users",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            data:{
                user: {
                    prenom: this.state.user.prenom,
                    nom: this.state.user.nom,
                    email: this.state.user.email
                }
            },
            success: function (res) {
                if(res.ok){
                    this.setState({
                        infoMessageType: 'success',
                        displayInfoMsg: true,
                        editingInfo: false,
                        infoSent:false,
                        infoMsg: res.msg,
                    });
                    this.props.setSigned_in({
                        user: this.state.user,
                        isLogged: true,
                    });
                } else {
                    this.setState({
                        infoMessageType: 'error',
                        displayInfoMsg: true,
                        editingInfo: true,
                        infoMsg: res.msg,
                    });
                }
            }.bind(this)
        });
    };

    onCancelInfo(e) {
        this.setState({
            user: this.props.user,
            editingInfo: false
        });
    }

    submitPassword(e) {
        e.preventDefault();
    };

    toggleEditInfo() {
        this.setState((state, props) => {
            return ({
                editingInfo: !state.editingInfo
            });
        })
    }

    onPrenomChange(e) {
        this.setState({user: {...this.state.user, prenom: e.target.value}});
    }

    onNomChange(e) {
        this.setState({user: {...this.state.user, nom: e.target.value}});
    }

    onEmailChange(e) {
        this.setState({user: {...this.state.user, email: e.target.value}});
    }


    render() {
        return (
            <div>
                <div className="flex space-between wrap">
                    <div className="flex-fixed-400">
                        <h2>My infos</h2>
                        <div className="flex rect-section column">
                            <div className={"message " + this.state.infoMessageType + (this.state.displayInfoMsg ? " active" : "")}>{this.state.infoMsg}</div>
                            <form className="flex" onSubmit={this.submitInfo}>
                                <label><span className="label bold">Name</span>
                                    <input value={this.state.user.prenom || ''} type="text"
                                           disabled={!this.state.editingInfo} onChange={this.onPrenomChange}/>
                                </label>
                                <label><span className="label bold">Surname</span>
                                    <input value={this.state.user.nom || ''} type="text"
                                           disabled={!this.state.editingInfo} onChange={this.onNomChange}/></label>
                                <label><span className="label bold">Email</span>
                                    <input value={this.state.user.email || ''} type="email"
                                           disabled={!this.state.editingInfo} onChange={this.onEmailChange}/></label>
                                {this.state.editingInfo ? (
                                        <div className="margin-bottom right">
                                            <button type="submit" disabled={this.state.infoSent}>{this.state.infoSent ? 'Saving...' : 'Save'}</button>
                                            <button type="button" onClick={this.onCancelInfo}>Cancel</button>
                                        </div>
                                    ) :
                                    <button className="margin-bottom" type="button" onClick={this.toggleEditInfo}>Edit
                                        info</button>
                                }
                            </form>
                            {/****************************SECTION PASSWORD*********************************/}
                            <form className="flex" onSubmit={this.submitPassword}>
                                <div>
                                    <h2>Password</h2>
                                    <div className="flex rect-section column">
                                        <label><span className="label bold">Current</span><input
                                            type="password"/></label>
                                        <label><span className="label bold">New</span><input type="password"/></label>
                                        <label><span className="label bold">Confirm</span><input
                                            type="password"/></label>
                                        <button type="submit">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/****************************SECTION STATS*********************************/}
                    <div className="flex-fixed-400">
                        <h2>My stats</h2>
                        <div className="rect-section listing">
                            <div className="listing-header listing-item bold ">
                                <div>Game</div>
                                <div>won/lost</div>
                            </div>
                            <div className="listing-item">
                                <div><a href="" className="link">MemoDeck</a></div>
                                <div>154/32</div>
                            </div>
                            <div className="listing-item">
                                <div><a href="" className="link">MemoDeck</a></div>
                                <div>154/32</div>
                            </div>
                            <div className="listing-item">
                                <div><a href="" className="link">MemoDeck</a></div>
                                <div>154/32</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    user: PropTypes.object,
    setSigned_in: PropTypes.func.isRequired
};

export default ProfilePage;
