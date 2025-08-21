import { useState } from 'react';
import './register.css';
import { registerApi } from '../../shared/config/api';
import { type AxiosResponse, type AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormInputs>({
    mode: "onChange"
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    if (loading) return;
    
    console.log('Registration attempt with data:', data); // Debug log
    
    if (!data.username.trim() || !data.email.trim() || !data.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);

    try {
      // API expects: {email, username, password}
      const apiData = {
        email: data.email.trim(),
        username: data.username.trim(),
        password: data.password
      };

      console.log('Calling registerApi with:', apiData); // Debug log
      const res: AxiosResponse = await registerApi(apiData);
      console.log('Full registration response:', res); // Debug log
      console.log('Registration response data:', res.data); // Debug log
      
      if (res.data && (res.status === 200 || res.status === 201)) {
        // Store authentication data if provided
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          console.log('Token stored:', res.data.token); // Debug log
        }
        
        if (res.data.user) {
          localStorage.setItem('currentUser', JSON.stringify(res.data.user));
          console.log('User stored:', res.data.user); // Debug log
        }
        
        toast.success('Registration successful! Welcome!');
        
        // Navigate to profile setup or home
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
        toast.error('Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Full registration error:', error); // Enhanced debug log
      console.error('Error response:', error.response?.data); // Debug log
      
      // Handle specific registration errors
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 409) {
        errorMessage = 'Username or email already exists';
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid registration data. Please check your inputs.';
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
    <div className="register-wrapper">
      <h1>Create an account</h1>
      
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          aria-invalid={!!errors.username}
          {...register('username', { 
            required: 'Username is required',
            minLength: {
              value: 2,
              message: 'Username must be at least 2 characters'
            },
            maxLength: {
              value: 30,
              message: 'Username must be less than 30 characters'
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Username can only contain letters, numbers, and underscores'
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
          type="email"
          placeholder="Email"
          aria-invalid={!!errors.email}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            },
            validate: (value) => {
              if (!value.trim()) {
                return 'Email cannot be empty or just spaces';
              }
              return true;
            }
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        
        <input
          type="password"
          placeholder="Password"
          aria-invalid={!!errors.password}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            },
            maxLength: {
              value: 100,
              message: 'Password must be less than 100 characters'
            },
            // Removed complex pattern for initial testing - you can add it back later
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
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <button type="button" onClick={() => navigate('/')}>
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
}