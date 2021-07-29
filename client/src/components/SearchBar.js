import React, { useEffect, useState, createRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Dropdown from './Dropdown';

const SearchBar = () => {
    const ref = createRef();
    const history = useHistory();
    const page = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({
        loaded: false,
        results: 0,
        data: []
    });
    const [showDropdown, setShowDropdown] = useState(true);

    useEffect(() => {
        setSearchTerm('');
    },[page])

    useEffect(() => {
        let callback = (e) => {
            if(!showDropdown) {
                return
            } else {
                if(ref.current.contains(e.target)) {//do nothing if we click within dropdown
                    setShowDropdown(false);
                    // setSearchTerm('');
                    return;
                } else { //hide menu if we click outside of it
                    setShowDropdown(false);
                }
            
            }
        }

        document.body.addEventListener('click', callback, {capture: true});

        return (() => {
            document.body.removeEventListener('click', callback, {capture: true})
        })
    },[ref, setShowDropdown, showDropdown]);

    useEffect(() => {
        if(searchTerm) {
            setSearchResults({
                loaded: false
            })
            const getSearchResults = setTimeout(() => {
                const getFilms = async () => {
                    const data = await fetch(`/api/searchfilms?film=${searchTerm}`)
                    .then(res => res.json())
                    setSearchResults({
                        loaded: true,
                        results: data.total_results,
                        data: [...data.results]
                    });
                }
                if(searchTerm) {
                    getFilms();
                }
            }, 500);
            return () => {
                clearTimeout(getSearchResults);
            }
        } else {
            setSearchResults({
                loaded: false
            })
        }
    }, [searchTerm]);


    const formSubmit = (e) => {
        e.preventDefault();
        history.push(`/api/search/${searchTerm}`);
        setSearchTerm('');
    }

    return(
        <div ref={ref} className="search-bar">
            <form onSubmit={(e) => formSubmit(e)} >
                <label htmlFor="search">Find a film by title</label>
                <input
                    onClick={() => setShowDropdown(true)}
                    style={{borderRadius: `${(showDropdown && searchTerm) ? '3px 3px 0px 0px' : '3px 3px 3px 3px'}`}} 
                    value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value) }}
                    name="search"
                ></input>
            </form>
            <Dropdown searchTerm={searchTerm} searchResults={searchResults} showDropdown={showDropdown} />
        </div>
    );
}

export default SearchBar;