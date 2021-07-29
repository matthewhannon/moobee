import React, { useEffect, useState } from 'react';
import extractYear from '../Utils/extractYear';
import separateCharacters from '../Utils/separateCharacters';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ShowResults from './ShowResults'


const ActorCredits = () => {
    const [actorCredits, setActorCredits] = useState({
        loaded: false,
        data: {}
    });
    const { actor_id } = useParams();

    useEffect(() => {
        const getActorCredits = async function() {
            const url = `/api/actorcredits?actor_id=${actor_id}`
            const data = await fetch(url).then(res => res.json());

            setActorCredits({
                loaded: true,
                data
            });
        }
        getActorCredits();
    }, [actor_id]);
    

    const showCredits = () => {
        const creditsList = actorCredits.data.cast.map(({ id, poster_path, backdrop_path, title, character, release_date }, i) => {
            let background;
            if(!poster_path && !backdrop_path) {
                background = `linear-gradient(to bottom, rgba(52, 172, 224, .5), rgba(64, 64, 122, .50))`;
            } else {
                background = `linear-gradient(to bottom, rgba(52, 172, 224, .5), rgba(64, 64, 122, .50)), url("https://image.tmdb.org/t/p/w300/${backdrop_path || poster_path}")`;
            }
            return (
                <Link className="filmcard-container" to={`/details/${id}`} key={id}>
                    <div className="filmcard" style={{backgroundImage: background}}>
                        <h2 className="filmcard-title">{title}</h2>
                        {separateCharacters(character, 'filmcard-character')}
                        <p className="filmcard-date">{extractYear(release_date)}</p>
                    </div>
                </Link>
            );
        })
        return creditsList;
    }

    return (
        <div className="actor-credits-page">
            <h2 className="actor-credits-page-title">Also in</h2>
            <div className="actor-credits-list">
                <ShowResults>
                    {actorCredits.loaded && showCredits()}
                </ShowResults>
            </div>
        </div>
    );
}

export default ActorCredits;
