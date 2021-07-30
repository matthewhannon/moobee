import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const GetVideos = ({ movie_id, setVideosLoaded }) => {
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


    const renderHelper = () => {
        if(videos.loaded && videos.data.results.length > 0) {
            return (
                <ReactPlayer onReady={() => {setVideosLoaded(true)}}
                    className='react-player'
                    url={`https://www.youtube.com/watch?v=${videos.data.results[0].key}`} 
                />
            )
        } else if(videos.loaded) {
            setVideosLoaded(true);
            return null;
        }
    }

    return (
        <div className='player-wrapper'>
            {renderHelper()}
      </div>
    )
}

export default GetVideos;