import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        if(!this.props.isLogged)
            this.props.redirect('/sign_in');

        this.state = {
            user: this.props.user,
            gameStats: {
                fetched: false
            },
            passwords: {
                current: "",
                new: "",
                confirm: ''
            },
            editingInfo: false,
            infoMessageType: 'success',
            displayInfoMsg: false,
            infoSent: false,
            infoMsg: "",
            pwdMessageType: 'success',
            displayPwdMsg: false,
            infoSent: false,
            pwdMsg: ""
        };
        this.submitInfo = this.submitInfo.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.toggleEditInfo = this.toggleEditInfo.bind(this);
        this.onPrenomChange = this.onPrenomChange.bind(this);
        this.onNomChange = this.onNomChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onCancelInfo = this.onCancelInfo.bind(this);
        this.onCurrentChange = this.onCurrentChange.bind(this);
        this.onNewChange = this.onNewChange.bind(this);
        this.onConfirmChange = this.onConfirmChange.bind(this);
        this.comparePasswords = this.comparePasswords.bind(this);
    }

    componentWillMount() {
        $.ajax({
            method: "GET",
            url: '/stats/getMyStats',
            success: function (res) {
                if (res.ok) {
                    this.setState({
                        gameStats: {
                            fetched: true,
                            stats: res.stats
                        }
                    });
                }
            }.bind(this)
        });
    }


    submitInfo(e) {
        e.preventDefault();
        this.setState({infoSent: true});
        $.ajax({
            method: "PATCH",
            url: "/users",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            data: {
                user: {
                    prenom: this.state.user.prenom,
                    nom: this.state.user.nom,
                    email: this.state.user.email
                }
            },
            success: function (res) {
                if (res.ok) {

                    this.setState({
                        infoMessageType: 'success',
                        displayInfoMsg: true,
                        editingInfo: false,
                        infoSent: false,
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

        $.ajax({
            method: "PUT",
            url: "/users/",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            data: {
                user: {
                    password_confirmation: this.state.passwords.confirm,
                    current_password: this.state.passwords.current,
                    password: this.state.passwords.new
                }
            },
            success: function (res) {
                const msgType = res.ok ? 'success' : 'error';
                this.setState({
                    pwdMessageType: msgType,
                    pwdMsg: res.msg,
                    displayPwdMsg: true,
                });
            }.bind(this)
        });
    };

    comparePasswords(e) {
        if (this.state.passwords.new !== e.target.value) {
            if (!$(e.target).hasClass('error'))
                $(e.target).addClass('error');
        }
        else {
            $(e.target).removeClass('error');
        }
    }

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

    onCurrentChange(e) {
        this.setState({passwords: {...this.state.passwords, current: e.target.value}});
    }

    onNewChange(e) {
        this.setState({passwords: {...this.state.passwords, new: e.target.value}});
    }

    onConfirmChange(e) {
        this.setState({passwords: {...this.state.passwords, confirm: e.target.value}});
        this.comparePasswords(e);
    }


    render() {
        return (
            <div>
                <div className="flex space-between wrap">
                    <div className="flex-fixed-400">
                        <h2>My infos</h2>
                        <div className="flex rect-section column">
                            <div
                                className={"message " + this.state.infoMessageType + (this.state.displayInfoMsg ? " active" : "")}>{this.state.infoMsg}</div>
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
                                            <button type="submit"
                                                    disabled={this.state.infoSent}>{this.state.infoSent ? 'Saving...' : 'Save'}</button>
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
                                    <div
                                        className={"message " + this.state.pwdMessageType + (this.state.displayPwdMsg ? " active" : "")}>{this.state.pwdMsg}</div>

                                    <div className="flex rect-section column">
                                        <label><span className="label bold">Current</span>
                                            <input type="password"
                                                   value={this.state.passwords.current}
                                                   onChange={this.onCurrentChange} required/>
                                        </label>
                                        <label>
                                            <span className="label bold">New</span>
                                            <input type="password"
                                                   value={this.state.passwords.new}
                                                   onChange={this.onNewChange} required minLength={6}/>
                                        </label>
                                        <label>
                                            <span className="label bold">Confirm</span>
                                            <input
                                                type="password"
                                                value={this.state.passwords.confirm}
                                                onChange={this.onConfirmChange} required minLength={6}
                                            />
                                        </label>
                                        <button type="submit" disabled={
                                            this.state.passwords.confirm === "" ||
                                            this.state.passwords.new === "" ||
                                            this.state.passwords.current === "" ||
                                            this.state.passwords.new !== this.state.passwords.confirm
                                        }>Save
                                        </button>
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

                            {!this.state.gameStats.fetched ? 'loading...'
                                :
                                this.state.gameStats.stats.map((stat, idx) => {
                                    return (
                                        <div className="listing-item" key={idx}>
                                            <div>
                                                <Link to={"/games/infos/" + stat.id} className="link">{stat.title}</Link>
                                            </div>
                                            <div>{stat.won}/{stat.total - stat.won}</div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    user: PropTypes.object,
    setSigned_in: PropTypes.func,
    redirect: PropTypes.func,
    isLogged: PropTypes.bool,
};

export default ProfilePage;
