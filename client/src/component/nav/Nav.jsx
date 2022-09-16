import React from 'react'
import { BiHome, BiLineChart, BiReceipt } from 'react-icons/bi';
import { MdSpaceDashboard } from 'react-icons/md';
import './Nav.css'

const Nav = () => {
    return (
        <div className='nav_container'>
            <a href='/'><BiHome /></a>
            <a href='/dashboard'><MdSpaceDashboard /></a>
            <a href='/report/pdfReport'><BiReceipt /></a>
            <a href='/report/allprojectbudgetplot'><BiLineChart /></a>
        </div>
    )
}

export default Nav