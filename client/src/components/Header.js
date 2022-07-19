import Logo from './iconImage2.png';
import React from 'react';
import {navigate} from '@reach/router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const logout = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then((res) => {navigate('/')})
            .catch(err => {console.log(err)});
    }
    return (
        <div className='App-header'>
            <div>
                <img src={Logo} className='App-logo' alt='logo' />
                <h1>Dashboard App</h1>
            </div>
            <div className='Navigation'>
                <Link to={`/`}><span className='btn btn-secondary btn-sm'>To Home Page</span></Link>
                <Link to={`/login`}><span className='btn btn-secondary btn-sm'>Login & Registration</span></Link>
                <Link to={`/login`}><span className='btn btn-secondary btn-sm' onClick={(e) => logout(e)}>Logout</span></Link>
            </div>
        </div>
    )
};

export default Header;