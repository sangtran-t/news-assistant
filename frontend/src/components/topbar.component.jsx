import React, { Component } from 'react';
import './styles/topbar.style.css';
import search from '../images/search.svg';
// import contact from '../images/contact.svg';
import star from '../images/star.svg';
import facebook from "../images/facebook.svg";
import twitter from '../images/twitter.svg';
import messenger from '../images/messenger.svg';

class Navigation extends Component{
    
    render() {
        return (
            <div className="nav">
                <div className="sub-nav logo">
                    <img src={star} alt="Logo" />
                </div>
                <div className="sub-nav">
                    <div className="icons search">
                        <img src={search} alt="Search" />
                    </div>
                    <div className="icons facebook">
                        <img src={facebook} alt="Facebook" />
                    </div>
                    <div className="icons twitter">
                        <img src={twitter} alt="Twitter" />
                    </div>
                    <div className="icons messenger">
                        <img src={messenger} alt="Messenger" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;