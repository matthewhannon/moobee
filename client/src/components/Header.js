import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
    return(
        <div className="header">
            <h1 className="header-title"><Link to="/">moobee</Link></h1>
            <SearchBar />
        </div>
    )
}

export default Header;