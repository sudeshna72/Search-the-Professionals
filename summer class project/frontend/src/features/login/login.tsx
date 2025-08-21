import { useState } from 'react';
import './login.css';
import { loginApi } from '../../shared/config/api';
import { type AxiosResponse, type AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: "onChange"
  });

  const onSubmit = async (data: LoginFormInputs) => {
    if (loading) return;
    
    console.log('Login attempt with data:', data); // Debug log
    
    if (!data.username.trim() || !data.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);

    try {
      console.log('Calling loginApi with:', data); // Debug log
      const res: AxiosResponse = await loginApi(data);
      console.log('Full login response:', res); // Debug log
      console.log('Login response data:', res.data); // Debug log
      
      if (res.data && res.status === 200) {
        // Store authentication data
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          console.log('Token stored:', res.data.token); // Debug log
        }
        
        if (res.data.user) {
          localStorage.setItem('currentUser', JSON.stringify(res.data.user));
          console.log('User stored:', res.data.user); // Debug log
        }
        
        toast.success('Login successful!');
        
        // Check profile completion status
        const profileCompleted = res.data.profileCompleted || 
                               res.data.user?.profileCompleted || 
                               res.data.user?.isProfileComplete ||
                               false;
        
        console.log('Profile completed:', profileCompleted); // Debug log
        
        if (!profileCompleted) {
          navigate('/profile-setup');
        } else {
          navigate('/home');
        }
      } else {
        console.error('Invalid response format:', res); // Debug log
        toast.error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Full login error:', error); // Enhanced debug log
      console.error('Error response:', error.response); // Debug log
      console.error('Error data:', error.response?.data); // Debug log
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid username or password';
      } else if (error.response?.status === 404) {
        errorMessage = 'User not found';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        errorMessage = 'Cannot connect to server. Please check if the server is running.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Sign in</h1>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          autoComplete="username"
          aria-invalid={!!errors.username}
          {...register('username', { 
            required: 'Username is required',
            minLength: {
              value: 2,
              message: 'Username must be at least 2 characters'
            },
            validate: (value) => {
              if (!value.trim()) {
                return 'Username cannot be empty or just spaces';
              }
              return true;
            }
          })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            },
            validate: (value) => {
              if (!value.trim()) {
                return 'Password cannot be empty or just spaces';
              }
              return true;
            }
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button 
          type="submit" 
          disabled={loading || !isValid}
        >
          {loading ? 'Logging in...' : 'Submit'}
        </button>
        
        <button type="button" onClick={() => navigate('/register')}>
          Go to Register Page
        </button>
      </form>
    </div>
  );
}