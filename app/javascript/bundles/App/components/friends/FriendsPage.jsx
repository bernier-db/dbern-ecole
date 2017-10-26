import React from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from "../common/ProfileIcon";
import {Link} from "react-router";
import CancelIcon from "../common/CancelIcon";


class FriendsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            friends: [],
            requests: [],
            emailSearch: ''
        };
        this.newRequest = this.newRequest.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        if (!this.props.isLogged) {
            this.props.redirect('/sign_in');
        } else
        //Fetch actual friends
            $.ajax({
                method: "GET",
                url: "/friends/getMyFriends",
                success: (res) => {
                    console.log(res);
                    if (res.ok) {
                        this.setState({
                            friends: res.friends,
                            requests: res.requests,
                            loaded: true,
                        });
                    }
                }
            });
    }


    answerReqFriend(rel_id, idx, answer, e) {
        if ($(e.target).hasClass('disabled'))
            console.log("is disabled");
        else {

            const but =  $(e.target);
            but.siblings().addClass('disabled');
            but.addClass('disabled');
            $.ajax({
                method: "POST",
                url: "/friends/answerRequest",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', auth)},
                data: {
                    answer: answer,
                    id: rel_id
                },
                success: (res) =>{
                    let reqs = JSON.parse(JSON.stringify(this.state.requests));
                    if (res.ok){

                        reqs[idx].accepted = answer;
                        reqs[idx].msg = res.msg;

                        if(answer){
                            const user = {
                                nom:  reqs[idx].nom,
                                prenom:  reqs[idx].prenom,
                                id:  reqs[idx].id
                            }
                            const friends = JSON.parse(JSON.stringify(this.state.friends));
                            friends.push(user);
                            this.setState({friends: friends});
                        }

                        this.setState({requests: reqs});
                    }
                    else {
                        but.removeClass('disabled');
                    }
                }
            });
        }
    }

    onEmailChange(e){
        this.setState({emailSearch: e.target.value});
    }

    submitForm(){
        $('#reqForm').trigger("submit", this.newRequest(e));
    }

    newRequest(e){
        e.preventDefault();
        const data = $(e.target).serializeArray();
        const email = data[0].value;

        $.ajax({
            method: "post",
            url: "",
            beforeSend: function(xhr){xhr.setRequestHeader('X-CSRF-Token', auth)},
            data:{
                email: email
            },
            success:(res){

        }
        });
    }

    render() {
        return (
            this.state.loaded ?
                (
                    <div className="flex space-between wrap">
                        <div className="flex-fixed-400">
                            <h2>My friends</h2>
                            <div className="flex rect-section listing">
                                {this.state.friends.map((friend, idx) => {
                                    return (
                                        <div className="listing-item flex padding margin" key={idx}>
                                            <Link to={"/user/" + friend.id} className={"flex align-center"}>
                                                <ProfileIcon height={"35px"}/>
                                                <span
                                                    style={{marginLeft: "20px"}}>{friend.prenom + " " + friend.nom}</span>
                                            </Link>
                                            <span className="clickable cancelIcon"
                                                  title="Delete this friend"><CancelIcon/></span>
                                        </div>)
                                })}
                            </div>

                        </div>

                        <div className={"flex-fixed-400"}>
                            <h2>Add a friend</h2>
                            <form className={"flex rect-section row"} onSubmit={this.newRequest}>
                                <input id="reqForm" className={"flex-auto max-w-240"} type="email" value={this.state.emailSearch}
                                       placeholder="Enter friend's email" name="email" onChange={this.onEmailChange} required/>
                                <div className="centered-LR">
                                    <button
                                    className="btn btn-blue background-color-trans">
                                        Send
                                    </button>
                                </div>
                            </form>

                            <div className="margin-top-30">
                                <h2>Received requests</h2>
                                <div className={"flex rect-section listing"}>
                                    {this.state.requests.map((req, idx) => {
                                        if (req.accepted === undefined) return (
                                            <div className="listing-item" key={idx}>
                                                <Link to={"/users/" + req.id}>
                                                    {req.prenom + " " + req.nom}
                                                </Link>
                                                <div className="flex flex-align-center">
                                                    <span onClick={(e) => {
                                                        this.answerReqFriend(req.rel_id, idx, true, e);
                                                    }} className="btn btn-group-left btn-green background-color-trans">Accept</span>
                                                    <span onClick={(e) => {
                                                        this.answerReqFriend(req.rel_id, idx, false, e);
                                                    }} className="btn btn-group-right btn-red background-color-trans">Decline</span>
                                                </div>
                                            </div>)
                                        else {
                                            return (
                                                <div className={"listing-item" + (req.accepted ? " green" : " red")} key={idx} onClick={(e)=>$(e.target).hide()}>
                                                    Request {req.accepted ? " accepted" : " declined"}
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                ) :
                <div>Loading...</div>
        );
    }
}

FriendsPage.propTypes = {};

export default FriendsPage;
