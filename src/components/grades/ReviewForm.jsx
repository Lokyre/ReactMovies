import React, { useState } from 'react';
import { setDoc, serverTimestamp } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { firestore } from '../../api/firebaseConfig';
import { FaStar } from 'react-icons/fa';
import './ReviewForm.scss'; // Asegúrate de importar el archivo SCSS

const ReviewForm = ({ userId, movieId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleStarClick = (index) => {
        setRating(index + 1);
        console.log('Rating: ', index + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(userId, movieId, rating, comment)
            await setDoc(doc(firestore, 'reviews', `${userId}_${movieId}`), {
                userId,
                movieId,
                rating,
                comment,
                timestamp: serverTimestamp()
            });
            alert('Reseña agregada correctamente');
            setRating(1);
            setComment('');
        } catch (error) {
            console.error('Error adding review: ', error);
            alert('Ocurrió un error al agregar la reseña');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block mb-2">Calificación:</label>
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            className={`cursor-pointer star ${index < rating ? 'color-yellow-400' : 'color-gray-300'}`}
                            size={40}
                            onClick={() => handleStarClick(index)}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Comentario:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    rows={4}
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Enviar reseña
            </button>
        </form>
    );
};

export default ReviewForm;