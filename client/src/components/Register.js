import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = (props) => {
    const [name, setName]  = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmReg, setConfirmReg] = useState('');
    const [err, setErr] = useState({});
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/register', {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }, {withCredentials: true})
            .then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setErr({});
                setConfirmReg('Thanks for registration!');
                navigate('/');
            })
            .catch(err => {setErr(err.response.data.errors)})
    };
    return (
        <div>
            <h2>Register</h2>
            <h4>{password}</h4>
            <h4>{confirmPassword}</h4>
            {confirmReg ? <p>{confirmReg}</p> : null }
            <form onSubmit={register}>
                <div>
                    <label>Name</label>
                    <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                {err.name ? <span>{err.name.message}</span> : null}
                <div>
                    <label>Email</label>
                    <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                {err.email ? <span>{err.email.message}</span> : null}
                <div>
                    <label>Password</label>
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {err.password ? <span>{err.password.message}</span> : null}
                <div>
                    <label>Confirm Password</label>
                    <input type='password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                {err.confirmPassword ? <span>{err.confirmPassword.message}</span> : null}
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Register;