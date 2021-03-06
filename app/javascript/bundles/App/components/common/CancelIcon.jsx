import React from 'react';
import PropTypes from 'prop-types'

const CancelIcon = (props) => {

    return (
        <svg className="cancelIcon" width="32" height="32">
                <path   d="m20.377,16.519l6.567,-6.566c0.962,-0.963 0.962,-2.539 0,-3.502l-0.876,-0.875c-0.963,-0.964 -2.539,-0.964 -3.501,0l-6.567,6.566l-6.567,-6.567c-0.962,-0.963 -2.538,-0.963 -3.501,0l-0.876,0.875c-0.962,0.963 -0.962,2.539 0,3.502l6.566,6.566l-6.566,6.567c-0.962,0.963 -0.962,2.538 0,3.501l0.876,0.876c0.963,0.963 2.539,0.963 3.501,0l6.567,-6.566l6.567,6.566c0.962,0.963 2.538,0.963 3.501,0l0.876,-0.876c0.962,-0.963 0.962,-2.538 0,-3.501l-6.567,-6.566z"/>
        </svg>
    );
};

CancelIcon.propTypes = {
};

export default CancelIcon;