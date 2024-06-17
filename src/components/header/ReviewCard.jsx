import React from 'react';
import { FaStar } from 'react-icons/fa';
import './Reviews.scss';

const ReviewCard = ({ review }) => {
    const { rating, comment } = review;

    // Función para generar estrellas basadas en la calificación
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        }
        return stars;
    };

    return (
        <div className="review-card bg-white shadow-md rounded-md p-4 mb-4">
            <div className="flex items-center mb-2">
                <div className="flex items-center">
                    {renderStars(rating)}
                </div>
            </div>
            <p className="text-sm mb-2">{comment}</p>
        </div>
    );
};

export default ReviewCard;
