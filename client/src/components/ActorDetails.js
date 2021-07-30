import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import ActorCredits from './ActorCredits';
import extractYear from '../Utils/extractYear';

const ActorDetails = () => {
    const [actorDetails, setActorDetails] = useState({
        loaded: false,
        data: {}
    });
    const { actor_id } = useParams();

    useState(() => {
        const getActorDetails = async function() {
            const url = `/api/actordetails?actor_id=${actor_id}`;
            const data = await fetch(url).then(res => res.json());
            setActorDetails({
                loaded: true,
                data
            });
        }
        getActorDetails();
    }, [actor_id]);

    const showActorDetails = () => {
        let { name, birthday, place_of_birth, profile_path } = actorDetails.data;
        if(actorDetails.loaded) {
            return (
                <React.Fragment>
                    <div className="actor-details">
                        <div className="actor-info">
                            <h2>{name}</h2>
                            <p>{extractYear(birthday)}</p>
                            <p>{place_of_birth}</p>
                            {/* <p>{biography}</p> */}
                        </div>
                        {profile_path && <img className="actor-image" src={`https://image.tmdb.org/t/p/h632${profile_path}`} alt={`${name}`}></img>}
                    </div>
                    <ActorCredits />
                </React.Fragment>
            )
        }
    }


    return (
        <div className="actor-details-page">
            {showActorDetails()}
        </div>
    )
}

export default ActorDetails;