import React from 'react';

const NotAllowed = () => {
    return (
        <h1 className="text-info">Access is not allowed! <span role={'img'} aria-label={'Denied'}>⛔</span></h1>
    );
};

export default NotAllowed;