import React from 'react';
import {navigate} from '@reach/router';
import Login from './Login';
import Register from './Register';

const LoginRegister = () => {
    return (
        <div>
            <Login />
            <hr />
            <Register />
            <div>
                <button onClick={() => navigate('/')}>To Home Page</button>
            </div>
        </div>
    )
};

export default LoginRegister;