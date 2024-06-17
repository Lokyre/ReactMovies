import React, { useState } from 'react';
import { auth } from '../api/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import '../scss/_global.scss';

const RegisterLogin = ({ isVisible, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userCredential;
            if (isRegister) {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                alert('Register successful');
            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
                alert('Login successful');
            }
            // Guardar el UID del usuario en Local Storage
            localStorage.setItem('userId', userCredential.user.uid);
        } catch (error) {
            console.error('Error: ', error);
            alert(`Ocurrió un error al ${isRegister ? 'registrarse' : 'iniciar sesión'}`);
        }
    };

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    if (!isVisible) return null;

    return (
        <div className="register-login-overlay">
            <div className="register-login-card">
                <h2 className="form-title">{isRegister ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <label className="form-label">
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                    </label>
                    <label className="form-label">
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                    </label>
                    <button type="submit" className="submit-button">
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                </form>
                <button onClick={onClose} className="close-button">
                    Close
                </button>
                <span onClick={toggleForm} className="toggle-button">
                    {isRegister ? 'Already have an account? Login' : 'Don’t have an account? Register'}
                </span>
            </div>
        </div>
    );
};

export default RegisterLogin;
