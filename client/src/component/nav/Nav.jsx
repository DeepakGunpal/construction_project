import React from 'react'
import { BiHome, BiLineChart, BiReceipt } from 'react-icons/bi';
import { MdSpaceDashboard } from 'react-icons/md';
import './Nav.css'

const Nav = () => {
    return (
        <div className='nav_container'>
            <a href='https://dgconstruction.herokuapp.com/'><BiHome /></a>
            <a href='https://dgconstruction.herokuapp.com/dashboard'><MdSpaceDashboard /></a>
            <a href='/report/pdfReport'><BiReceipt /></a>
            <a href='/report/allprojectbudgetplot'><BiLineChart /></a>
        </div>
    )
}

export default Nav