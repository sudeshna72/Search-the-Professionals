import { useState, type ChangeEvent, type FormEvent } from 'react';
import './register.css';
import { registerApi } from '../../shared/config/api'; // 👈 make sure this exists
import { type AxiosResponse, type AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    registerApi(formData)
      .then((res: AxiosResponse) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        navigate('/login');
      })
      .catch((error: AxiosError) => {
        console.error(error);
        toast.error('Registration failed. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="register-wrapper">
      <h1>Create an account</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleChange}
          value={formData.username}
          type="text"
          placeholder="Username"
        />
        <input
          name="password"
          onChange={handleChange}
          value={formData.password}
          type="password"
          placeholder="Password"
        />
        <input
          name="email"
          onChange={handleChange}
          value={formData.email}
          type="email"
          placeholder="Email"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
