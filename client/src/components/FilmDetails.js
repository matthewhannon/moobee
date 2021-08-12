import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import extractYear from '../Utils/extractYear';
import Cast from './Cast';
import GetVideos from './GetVideos';

const FilmDetails = () => {
    const [filmDetails, setFilmDetails] = useState({
        loaded: false,
        data: {}
    });
    const [videoLoaded, setVideosLoaded] = useState(false);
    const { movie_id } = useParams();

    useEffect(() => {
        const getDetails = async function() {
            const url = `/api/filmdetails?movie_id=${movie_id}`;
            const data = await fetch(url).then(res => res.json());
            setFilmDetails({
                loaded: true,
                data
            });
        }
        getDetails();
    }, [movie_id])

    const showDetails = () => {
        let {title, poster_path, release_date, runtime, tagline, id, overview } = filmDetails.data;
        if(filmDetails.loaded) {
            return (
                <React.Fragment>
                    <div className="film-details">
                        {poster_path && <img className="film-details-poster" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title + 'poster'}></img>}
                        <div className="film-details-info">
                            <h2 className="film-info-title">{title}</h2>
                            <p className="film-info-release-date">{extractYear(release_date)}</p>
                            <p className="film-info-tagline">{tagline}</p>
                            {runtime > 0 && <p className="film-info-runtime">{runtime + ' minutes'}</p>}
                        </div>
                    </div>
                    <p className="overview">{overview}</p>
                    <GetVideos movie_id={id} setVideosLoaded={setVideosLoaded}/>
                    {videoLoaded && <Cast />}
                </React.Fragment>
            )
        } else {
            return null;
        }
    }

    return (
        <div className="film-details-page">
            {showDetails()}
        </div>
    )
}

export default FilmDetails;