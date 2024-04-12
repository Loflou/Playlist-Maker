import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await userService.login(formData);
            if (data.accessToken) {
                console.log('Login successful, redirecting...');
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/playlists'); // Adjusted the route to dashboard page
            }
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
            console.error('Error trace:', error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
            <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;