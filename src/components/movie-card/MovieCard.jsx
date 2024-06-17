import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCard = props => {

    const item = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    const description = item.overview ? item.overview : 'No description available';

    return (
        <Link to={link}>
            <div className="movie-card relative bg-cover bg-center flex flex-col justify-center items-center p-4" style={{ backgroundImage: `url(${bg})` }}>
                <p className="description mb-4">{description}</p>
                <Button className="small bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out">View more</Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

export default MovieCard;
