import React, { useState } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { username, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await userService.register(formData);
            if (data.accessToken) {
                localStorage.setItem('user', JSON.stringify(data));
                console.log('Registration successful, redirecting to playlists...');
                navigate('/playlists'); // Adjusted the route to playlists as necessary
            } else {
                console.error('Registration failed: No access token received');
                setError('Registration failed: No access token received');
            }
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data.message : 'An unexpected error occurred', error);
            setError(error.response ? error.response.data.message : 'An unexpected error occurred');
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
            <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required minLength="6" />
            <button type="submit">Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default RegisterForm;