import React, { useState, useEffect} from 'react';

import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import Slider from 'react-slick';

const VideoList = props => {

    const { category } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, props.id);
            setVideos(res.results.slice(0, 5));
        }
        getVideos();
    }, [category, props.id]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        afterChange: current => setCurrentIndex(current + 1) // Actualiza el índice actual después de cada cambio

    };
    const [currentIndex, setCurrentIndex] = useState(1); // Estado para almacenar el índice actual del video

    return (
        <>
            <Slider {...settings}>
                {videos.map((item, i) => (
                    <Video key={i} item={item}/>
                ))}
            </Slider>
            <VideoProgressBar currentIndex={currentIndex - 1} totalVideos={videos.length} />

        </>
    );
}

const Video = ({ item }) => {
    return (
        <div className="video p-4">
            <div className="video__title mb-2">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                width="100%"
                height="500px" // Ajusta la altura según tus necesidades
                title="video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    )
}

const VideoProgressBar = ({ currentIndex, totalVideos }) => {
    return (
      <div className="video-progress-bar">
        {Array.from({ length: totalVideos }, (_, i) => (
          <div
            key={i}
            className={`progress-bar-item ${i === currentIndex ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    );
  };

export default VideoList;
