import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom'

import {Router, browserHistory} from 'react-router';
import routes from '../bundles/App/components/routes';



const Index = props => (
    <Router history={browserHistory} routes={routes}/>
)

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Index/>,
        document.getElementById("app"),
    )
})
