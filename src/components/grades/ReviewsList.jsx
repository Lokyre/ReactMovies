import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../../api/firebaseConfig';
import { FaStar } from 'react-icons/fa'; // Importa el ícono de estrella de React Icons
import { useAuth } from '../Auth/AuthContext';

const ReviewsList = () => {
    const [reviews, setReviews] = useState([]);

    const { currentUser } = useAuth();


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsCollection = collection(firestore, 'reviews');
                const q = query(reviewsCollection);
                const querySnapshot = await getDocs(q);
                const fetchedReviews = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setReviews(fetchedReviews);
                console.log('Reviews:', fetchedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="reviews-list">
            {reviews.map(review => (
                <div key={review.id} className="review-item mb-4 p-4 bg-white rounded shadow-md">
                    <div className="flex items-center mb-2">
                        <p className="mr-2">{currentUser.userId}</p>
                        <div className="flex">
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    style={{ color: index < review.rating ? '#fbbf24' : '#d1d5db' }}

                                />
                            ))}
                        </div>
                        <p>{review.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewsList;
