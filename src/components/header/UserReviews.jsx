import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../api/firebaseConfig';
import ReviewCard from './ReviewCard'; // Componente para mostrar cada reseña
import PageHeader from '../page-header/PageHeader';
import './Reviews.scss';
import { useAuth } from '../Auth/AuthContext';

const UserReviews = () => {
    const [reviews, setReviews] = useState([]);

    const { currentUser } = useAuth();
    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const q = query(collection(firestore, 'reviews'), where('userId', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);
                const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReviews(fetchedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        if (currentUser) {
            fetchUserReviews();
        }
    }, [currentUser]);

    return (
        <>
            <PageHeader>
                Reseñas
            </PageHeader>
            <div className="user-reviews-container">
                <h2 className="text-2xl font-semibold mb-4">Mis Reseñas</h2>
                {reviews.length === 0 && <p>No hay reseñas disponibles.</p>}
                {reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </>
    );
};

export default UserReviews;
