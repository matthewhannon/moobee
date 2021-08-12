import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import extractYear from '../Utils/extractYear';
import ShowResults from './ShowResults';

const Trending = () => {
    const [trendingFilms, setTrendingFilms] = useState({
        loaded: false,
        data: {}
    });

    useEffect(() => {
        const trendingFilms = async function() {
            const url = `/api/trending`;
            const data = await fetch(url).then(res => res.json());
            setTrendingFilms({
                loaded: true,
                data
            });
        }
        trendingFilms();
    },[])

    const showResults = () => {
        const resultsPage = trendingFilms.data.results.map(({id, poster_path, backdrop_path, title, release_date}, i) => {
            return (
                <Link className="filmcard-container" to={`/details/${id}`} key={id}>
                    <div className="filmcard" style={{backgroundImage: `linear-gradient(to bottom, rgba(52, 172, 224, .2), rgba(64, 64, 122, .50)), url("https://image.tmdb.org/t/p/w780/${backdrop_path || poster_path}")`}}>
                        <h2 className="filmcard-title">{title}</h2>
                        <p className="filmcard-date">{extractYear(release_date)}</p>
                    </div>
                </Link>
            )

        })
        return resultsPage;
    }

    const handleScroll = (e) => {
        let element = e.target;
        console.log(e);
        if(element.scrollHeight - element.scrollTop === element.clientHeight) {
            console.log('end of scroll');
        }
    }

    return (
        <div className="trending-page">
            <h2 className="trending-page-title">Trending Films</h2>
            <div className="trending-films" onScroll={handleScroll}>
                <ShowResults>
                    {trendingFilms.loaded && showResults()}
                </ShowResults>
            </div>
        </div>
    );
}

export default Trending;