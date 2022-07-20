import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/login', {
                email: email,
                password: password
            }, {withCredentials: true})
            .then(() => navigate('/'))
            .catch(err => {setErrorMessage(err.response.data.msg)})
    };
    return (
        <div>
            <h2>Login</h2>
            <p>{errorMessage ? errorMessage : null }</p>
            <form onSubmit={login}>
                <div>
                    <label>Email</label>
                    <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default Login;