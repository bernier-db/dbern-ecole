import React from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from "../common/ProfileIcon";
import {Link} from "react-router";


class FriendsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            friends: [],
            requests: [],
        };
        this.fetchFriends = this.fetchFriends.bind(this);
        this.fetchRequests = this.fetchRequests.bind(this);
    }

    componentWillMount() {
        //Fetch actual friends
        $.ajax({
            method:"GET",
            url:"/friends/getMyFriends",
            success: (res) => {
                if(res.ok){
                    this.setState({
                        friends: res.friends,
                        requests: res.requests,
                        loaded: true,
                    });
                }
            }
        });
    }

    fetchFriends() {
    }

    fetchRequests() {
    }


    render() {
        return (
            this.state.loaded ?
                (
                    <div className="flex space-between wrap">
                        <div className="flex-fixed-400">
                            <h2>My friends</h2>
                            <div className="flex rect-section listing">
                                {this.state.friends.map((friend, idx)=>{
                                return(
                                <div className="listing-item flex padding margin" key={idx}>
                                    <Link to={"/user/" + friend.id} className={"flex align-center"}>
                                        <ProfileIcon height={"35px"}/>
                                        <span style={{marginLeft: "20px"}}>{friend.prenom + " " + friend.nom}</span>
                                    </Link>
                                    <span className="clickable" title="Delete this friend"><img src="/assets/delete.svg"/> </span>
                                </div>)
                                })}
                            </div>

                        </div>

                        <div className={"flex-fixed-400"}>
                            <h2>Add a friend</h2>
                            <div className={"flex rect-section row"}>
                                <input className={"flex-auto"} type="email" value={""} placeholder="Enter friend's email" />
                                <div><span className="btn btn-blue">Send</span></div>
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
