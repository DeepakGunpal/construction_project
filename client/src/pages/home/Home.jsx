import React from 'react';
import './Home.css';
import Nav from '../../component/nav/Nav';

const Home = () => {
    return (
        <div>
            <div className='nav_on_home'>
                <Nav />
            </div>
            <div className='home'>
                <h1>Welcome To Bhumio</h1>
                <h2>Manage Your Construction Project Hassle-free!</h2>
                <a href='/dashboard'><button>Go To Dashboard</button></a>
            </div>
        </div>
    )
}

export default Home