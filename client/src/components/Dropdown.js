import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ searchResults, searchTerm, showDropdown }) => {

    const renderResults = (searchResults) => {
        if(!searchTerm) {
            return null
        } else if(searchTerm && !searchResults.loaded) {
            return (
                <div className="loading">
                    {/* <p>Loading</p> */}
                    <img src="https://img.icons8.com/ios-glyphs/60/000000/documentary.png"/>
                </div>
            )
        } else if (searchTerm && searchResults.loaded && !searchResults.results) {
            return (
                <div className="no-results">
                    <p>no results</p>
                </div>
            )
        } else if (searchResults.loaded) {
            const filmsList = searchResults.data.map(({ id, title, release_date, poster_path }, i) => {
                if(i <= 4) {
                    return (
                        <Link key={id} to={`/details/${id}`}>
                            {/* <div className="dropdown-result" style={{backgroundColor: `hsl(42, 56%, ${60 - i * 5}%, 1)`}} key={id}></div> */}
                            {/* <div className="dropdown-result" key={id}> */}
                            <div className="dropdown-result" style={{backgroundColor: `hsla(42, 16%, ${90 - i * 5}%, 1)`}} key={id}>
                                <div className="dropdown-result-details"> 
                                    <h3 className="dropdown-result-title">{title}</h3>
                                    <p className="dropdown-result-year">{release_date && release_date.slice(0,4)}</p>
                                </div>
                                {
                                    // (
                                    //     poster_path ? <img 
                                    //         className="dropdown-result-thumbnail" 
                                    //         src={`https://image.tmdb.org/t/p/w92/${poster_path}`} 
                                    //         alt="movie poster">
                                    //         </img> : null
                                    // )
                                    (
                                        poster_path ? <div
                                            className="dropdown-result-thumbnail"
                                            style={{backgroundImage: `url(https://image.tmdb.org/t/p/w92${poster_path})`}}>
                                            </div> : null
                                    )
                                }
                            </div>
                        </Link>
                    )
                } else {
                    return null;
                }
            })
            return filmsList;
        }
    }

    return (
        <div className="dropdown">
            <div className="dropdown-container" style={showDropdown ? {display: 'block'} : {display: 'none'}}>
                {searchResults && renderResults(searchResults)}
            </div>
        </div>
    );
}

export default Dropdown;