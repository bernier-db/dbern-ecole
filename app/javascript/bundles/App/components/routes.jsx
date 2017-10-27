import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './App';
import HomePage from './home/HomePage';
import GamesPage from './games/GamesPage';
import ProfilePage from './profile/ProfilePage';
import FriendsPage from './friends/FriendsPage';
import SigninPage from './signin/SigninPage';
export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="games" component={GamesPage} />
		<Route path="games/:id" component={GamesPage} />
		<Route path="home" component={HomePage} />
		<Route path="profile" component={ProfilePage} />
		<Route path="friends" component={FriendsPage} />
		<Route path="sign_in" component={SigninPage}/>
	</Route>
);
