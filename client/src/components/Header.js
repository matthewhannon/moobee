import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
    return(
        <div className="header">
            <div className="header-title-container">
                <Link to="/">
                    <h1>moobee</h1>
                </Link>
            </div>
            <SearchBar />
        </div>
    )
}

export default Header;