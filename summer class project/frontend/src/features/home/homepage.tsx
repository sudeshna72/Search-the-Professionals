import { useEffect, useState } from 'react';
import { getUserListApi, getUserSearchApi } from '../../shared/config/api'
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/components/header/header';
import type { User, UserListResponse } from '../../shared/Interface/interface';
import './homepage.css';
import type { AxiosResponse } from 'axios';

export default function Homepage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [userList, setUserList] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('All');

  // Fixed useEffect with proper error handling
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    getUserSearchApi(search).then(
      (res: AxiosResponse<UserListResponse>) => {
        console.log('Search response:', res); // Debug log
        setUserList(res.data.users || []); // Fallback to empty array
      }
    ).catch((error) => {
      console.error('Search error:', error); // Debug log
      setError('Failed to search users');
      setUserList([]);
    }).finally(() => {
      setLoading(false);
    });
  }, [search]);

  // Fixed handleSearch function
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Search submitted with term:', search); // Debug log
    
    setLoading(true);
    setError(null);
    
    getUserSearchApi(search).then(
      (res: AxiosResponse<UserListResponse>) => {
        console.log('Manual search response:', res); // Debug log
        setUserList(res.data.users || []);
      }
    ).catch((error) => {
      console.error('Manual search error:', error); // Debug log
      setError('Failed to search users');
      setUserList([]);
    }).finally(() => {
      setLoading(false);
    });
  }

  // Fixed handleCategoryClick function
  function handleCategoryClick(event: React.MouseEvent<HTMLButtonElement>) {
    const selectedCategory = event.currentTarget.textContent || '';
    console.log('Category clicked:', selectedCategory); // Debug log
    
    setCategory(selectedCategory);
    setError(null);

    setLoading(true);
    
    // If "All" is selected, get all users, otherwise search by category
    const searchTerm = selectedCategory === 'All' ? '' : selectedCategory;
    
    getUserSearchApi(searchTerm).then(
      (res: AxiosResponse<UserListResponse>) => {
        console.log('Category search response:', res); // Debug log
        setUserList(res.data.users || []);
      }
    ).catch((error) => {
      console.error('Category search error:', error); // Debug log
      setError('Failed to fetch users for this category');
      setUserList([]);
    }).finally(() => {
      setLoading(false);
    }); 
  }

  const navigate = useNavigate();

  const categories = [
    "All", "App Development", "Web Development", "Data Science", "Machine Learning", "UI/UX Design", "Cyber Security"
  ];

  // Function to handle profile navigation
  const handleProfileClick = (userId: string) => {
    console.log('Navigating to profile:', userId); // Debug log
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      <div className="homepage">
        <header className="hero">
          <h1>Find Your Ideal Professional</h1>
          <p>Search, connect, and grow your network</p>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search professionals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={category === cat ? "active" : ""}
                onClick={handleCategoryClick}
                disabled={loading}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <main className="profiles-section">
          <h2>
            {search ? `Search Results for "${search}"` : 
             category === 'All' ? 'All Professionals' : 
             `${category} Professionals`}
          </h2>

          {/* Error display */}
          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          {loading ? (
            <p className="loading">Loading...</p>
          ) : userList.length === 0 ? (
            <div className="no-results">
              <p>😕 Sorry, no professionals found.</p>
              {search || category !== 'All' ? (
                <button 
                  onClick={() => {
                    setSearch('');
                    setCategory('All');
                  }}
                  style={{ marginTop: '10px', padding: '8px 16px' }}
                >
                  Show All Professionals
                </button>
              ) : null}
            </div>
          ) : (
            <div className="profile-grid">
              {userList.map((user) => (
                <div 
                  key={user._id} 
                  className="profile-card"
                  onClick={() => handleProfileClick(user._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="avatar">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="info">
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                    <p className="category" style={{ 
                      fontSize: '0.9em', 
                      color: '#007bff', 
                      fontWeight: '500' 
                    }}>
                      {user.category}
                    </p>
                    {user.about && (
                      <p className="about" style={{ 
                        fontSize: '0.9em', 
                        color: '#666', 
                        marginTop: '5px' 
                      }}>
                        {user.about.length > 100 ? 
                          `${user.about.substring(0, 100)}...` : 
                          user.about
                        }
                      </p>
                    )}
                    {user.skills && user.skills.length > 0 && (
                      <div className="skills" style={{ marginTop: '8px' }}>
                        {user.skills.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index} 
                            style={{ 
                              display: 'inline-block',
                              backgroundColor: '#e9ecef',
                              color: '#495057',
                              padding: '2px 6px',
                              borderRadius: '12px',
                              fontSize: '0.8em',
                              marginRight: '4px',
                              marginBottom: '2px'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                        {user.skills.length > 3 && (
                          <span style={{ fontSize: '0.8em', color: '#666' }}>
                            +{user.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}