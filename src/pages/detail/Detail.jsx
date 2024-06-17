import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import ReviewForm from '../../components/grades/ReviewForm';
import { useAuth } from '../../components/Auth/AuthContext';
import ReviewsList from '../../components/grades/ReviewsList';

const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    const { currentUser } = useAuth();

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
        }
        getDetail();
    }, [category, id]);

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Elenco:</h2>
                                    </div>
                                    <CastList id={item.id} />
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3 max-w-xs mx-auto">
                                <VideoList id={item.id} />
                            </div>

                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id} />
                            </div>

                            <div className="section mb-3 max-w-xs mx-auto">
                                {currentUser ? (
                                    <ReviewForm userId={currentUser?.uid} movieId={item.id} />
                                ) : (
                                    <div className="bg-gray-700 bg-opacity-50 flex items-center justify-center p-2 rounded">
                                        <div className="flex items-center">

                                            <p className="text">Necesitas iniciar sesión para dejar una reseña</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="section mb-3 max-w-xs mx-auto">
                                <div className="section__header mb-2">
                                    <h2>Reviews</h2>
                                </div>
                                <ReviewsList movieId={item.id} />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;
