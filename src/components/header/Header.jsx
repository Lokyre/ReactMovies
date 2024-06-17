import React, { useRef, useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './header.scss';

import logo from '../../assets/tmovie.png';
import Button from '../button/Button';
import RegisterLogin from '../../pages/RegisterLogin';
import { useAuth } from '../Auth/AuthContext';
import { auth } from '../../api/firebaseConfig';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    },
];

const Header = () => {
    const { currentUser } = useAuth();

    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);

    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

    const toggleSubmenu = () => {
        setIsSubmenuVisible(!isSubmenuVisible);
    };


    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleLogout = () => {
        // Aquí colocarías la lógica para cerrar sesión
        // Por ejemplo, si estás usando Firebase:
        auth.signOut()
            .then(() => {

            })
            .catch(error => {
                console.error('Error al cerrar sesión:', error);
                // Manejar el error de cierre de sesión si es necesario
            });
    };


    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">WooFlix</Link>
                </div>
                <ul className="header__nav font-semibold relative text-xl">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                    {!currentUser ? (
                        <li className='hover:text-blue-300 btn_login no-animation'>
                            <Button className="flex items-center transition duration-150 ease-in-out force-text-white"
                                onClick={handleOpenModal}>
                                Login
                            </Button>
                        </li>
                    ) : (
                        <div className="absolute">
                            <div className="container cursor-pointer" onClick={toggleSubmenu}>
                                <div className="blue-box"></div>
                            </div>
                            {isSubmenuVisible && (
                                <div className="submenu">
                                    <ul>
                                        <li>
                                        <div className='text-small' onClick={() => window.location.href = '/reviewsuser'}>Reseñas</div>                                        </li>
                                        <li>
                                            <div className='text-small' onClick={handleLogout}>Cerrar sesión</div>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </ul>
            </div>
            <RegisterLogin isVisible={isModalVisible} onClose={handleCloseModal} />

        </div>
    );
}

export default Header;
