import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const GetVideos = ({ movie_id }) => {
    const [videos, setVideos] = useState({
        loaded: false,
        data: {}
    });

    useEffect(() => {
        const getData = async () => {
            const url= `/api/searchvideos?movie_id=${movie_id}`;
            const data = await fetch(url).then(res => res.json());
            setVideos({
                loaded: true,
                data
            })
        }
        getData();
    },[movie_id]);

    

    return (
        <div className='player-wrapper'>
            {(videos.loaded && videos.data.results.length > 0) && <ReactPlayer
                className='react-player'
                url={`https://www.youtube.com/watch?v=${videos.data.results[0].key}`}
            />}
      </div>
    )
}

export default GetVideos;