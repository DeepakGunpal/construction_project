import React from 'react';
import './Home.css';
import Nav from '../../component/nav/Nav';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className='nav_on_home'>
                <Nav />
            </div>
            <div className='home'>
                <h1>Welcome To Bhumio</h1>
                <h2>Manage Your Construction Project Hassle-free!</h2>
                <Link to='/dashboard'><button>Go To Dashboard</button></Link>
            </div>
        </div>
    )
}

export default Home