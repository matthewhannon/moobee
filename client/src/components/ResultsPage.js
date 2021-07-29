import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import extractYear from '../Utils/extractYear';
import ShowResults from './ShowResults';

const ResultsPage = () => {
    const [searchResults, setSearchResults] = useState({
        loaded: false,
        results: 0,
        data: []
    });
    const { title } = useParams();

    useEffect(() => {
        const getSearchResults = setTimeout(() => {
            const getFilms = async () => {
                const data = await fetch(`/api/searchfilms?film=${title}`)
                .then(res => res.json());
                setSearchResults({
                    loaded: true,
                    results: data.total_results,
                    data: [...data.results]
                });
            }
            if(title) {
                getFilms();
            }
        }, 500);
        return () => {
            clearTimeout(getSearchResults);
        }
    }, [title]);

    const showResults = () => {
        const resultsPage = searchResults.data.map(({ id, poster_path, backdrop_path, title, release_date }, i) => {
            let background;
            if(!poster_path && !backdrop_path) {
                background = `linear-gradient(to bottom, rgba(52, 172, 224, .5), rgba(64, 64, 122, .50))`;
            } else {
                background = `linear-gradient(to bottom, rgba(52, 172, 224, .5), rgba(64, 64, 122, .50)), url("https://image.tmdb.org/t/p/original/${backdrop_path || poster_path}")`;
            }
                                // had double character credits show up, so they had duplicate key key={id + 1}
            return (
                <Link className="filmcard-container" to={`/details/${id}`} key={id + i}>
                    <div className="filmcard" style={{backgroundImage: background}}>
                        <h2 className="filmcard-title">{title}</h2>
                        <p className="filmcard-date">{extractYear(release_date)}</p>
                    </div>
                </Link>
            )
        })
        return resultsPage;
    }

    return(
        <div className="results-page">
            <div className="results-page-list">
                <ShowResults>
                    {searchResults.loaded && showResults()}
                </ShowResults>
            </div>
        </div>
    )

}

export default ResultsPage;