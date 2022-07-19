import React from 'react';
import Login from './Login';
import Register from './Register';

const LoginRegister = () => {
    return (
        <div className='LoginRegister'>
            <div>
                <Login />
                <Register />
            </div>
        </div>
    )
};

export default LoginRegister;