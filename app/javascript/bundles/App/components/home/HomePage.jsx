import React from 'react';
import PropTypes from 'prop-types';
// import fetch from 'whatwg-fetch';


class HomePage extends React.Component {

    componentDidMount(){
        fetch('/getData').then((res)=>{
            console.log('Fetched : ');
            res.json().then((a)=>{console.log(a);})
        });
    }

    render() {
        return (
          <div>Home Pageeee</div>
        );
    }
}
HomePage.propTypes = {
};

export default HomePage;
