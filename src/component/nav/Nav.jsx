import React from 'react'
import { BiHome, BiLineChart, BiReceipt } from 'react-icons/bi';
import { MdSpaceDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
    return (
        <div className='nav_container'>
            <Link to='/'><BiHome /></Link>
            <Link to='/dashboard'><MdSpaceDashboard /></Link>
            <Link to='/report/pdfReport'><BiReceipt /></Link>
            <Link to='/report/allprojectbudgetplot'><BiLineChart /></Link>
        </div>
    )
}

export default Nav