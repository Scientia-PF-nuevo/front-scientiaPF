import React from "react";
import './Nav.css';
import { Link } from "react-router-dom";
// import { FiShoppingCart } from "@react-icons/all-files/fi/FiShoppingCart";
import CustomizedBadges from "../Cart/customCart";

// Logo
import logo from '../../images/icon.png';

export default function Nav () {
    return (
        <div className='container'> 
            <div className='containLogo'>
                <Link to='/home'>
                    <img className='logoNav' src={logo} alt='logo Scientia' />
                </Link>
            </div>
            <nav className='containerNav'>
                <div className='containLi'>
                    <Link className='linkNav' to='/home'>
                        <li className='liNav'>
                            Home
                        </li>
                    </Link>
                    <Link className='linkNav' to='/about'>
                        <li className='liNav'>
                            About
                        </li>
                    </Link>
                    <Link className='linkNav' to='/form'>
                        <li className='liNav'>
                            Form
                        </li>
                    </Link>
                    <Link className='linkNav' to='/cart'>
                        <li className='liNav'>
                            <CustomizedBadges />
                        </li>
                        </Link>
                </div>
            </nav>
        </div>
    );
};