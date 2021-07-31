import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import separateCharacters from '../Utils/separateCharacters';
import ShowResults from './ShowResults';

const Cast = () => {
    const [filmCast, setFilmCast] = useState({
        loaded: false,
        data: {}
    });
    const { movie_id } = useParams();

    useEffect(() => {
        const getCast = async function() {
            const url =`/api/cast?movie_id=${movie_id}}`
            const data = await fetch(url).then(res => res.json());
            setFilmCast({
                loaded: true,
                data
            })
        }
        getCast();
    }, [movie_id]);

    const showCast = () => {
        let { cast } = filmCast.data;

        if(filmCast.loaded && cast.length > 0) {
            const castList = cast.map(({name, character, id, profile_path }, i) => {
                return (
                    <Link className="cast-card-a-container" to={`/actor/${id}`} key={i}>
                        <div className="cast-card">
                            <div className="cast-card-info">
                                <p className="cast-card-name" >{name}</p>
                                {separateCharacters(character, 'cast-card-character')}
                            </div>
                            {profile_path ? <img className="cast-card-image" src={`https://image.tmdb.org/t/p/w185/${profile_path}`} alt={`${name}`}></img> : null}
                        </div>
                    </Link>
                )
            })
            return (
                <div className="cast-page">
                    <h2 className="cast-page-title">Cast</h2>
                    <div className="cast-list">
                        <ShowResults>
                            {castList}
                        </ShowResults>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }

    return (
        <React.Fragment>
            {filmCast.loaded && showCast()}
        </React.Fragment>
    );
}

export default Cast;