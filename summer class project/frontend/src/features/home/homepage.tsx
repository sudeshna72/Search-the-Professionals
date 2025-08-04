
import { useEffect, useState } from 'react';
import { getUserListApi, getUserSearchApi } from '../../shared/config/api'

interface User {
  _id: string;
  username: string;
  email: string;

}

interface UserListResponse {
  users: User[];
}
import './homepage.css';
import type { AxiosResponse } from 'axios';




export default function Homepage() {
  /* const [user, setUser] = useState<User[]>([]); */
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [userList, setUserList] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');


  useEffect(() => {
    setLoading(true);
    getUserSearchApi(search).then(
      (res: AxiosResponse<UserListResponse>) => {
        setUserList(res.data.users)
      }
    ).finally(() => {
      setLoading(false);
    });

  }, []);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(search);

    setLoading(true);
    getUserSearchApi(search).then(
      (res: AxiosResponse<UserListResponse>) => {
        setUserList(res.data.users)
      }
    ).finally(() => {
      setLoading(false);
    });
  }

  function handleCategoryClick(selectedCategory: string){
    setSelectedCategory(selectedCategory);
    setSearch(selectedCategory);

    setLoading(true);
    getUserSearchApi(selectedCategory).then(
      (res: AxiosResponse<UserListResponse>) => {
        setUserList(res.data.users)
      }
    ).finally(() => {
      setLoading(false);
    }); 
  }

  const category =[
    "All", "App Development", "Web Development", "Data Science", "Machine Learning", "UI/UX Design", "Cyber Security"
  ]

  return (
    <>
        <div className="homepage">
      <header className="hero">
        <h1>Find Your Ideal Professional</h1>
        <p>Search, connect, and grow your network</p>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search professionals by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="categories">
          {category.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="profiles-section">
        <h2>Recently Uploaded Professionals</h2>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : userList.length === 0 ? (
          <div className="no-results">
            <p>😕 Sorry, no professionals found.</p>
          </div>
        ) : (
          
                  <div className="profile-grid">
            {userList.map((user) => (
              <div key={user._id} className="profile-card">
                <div className="avatar">{user.username.charAt(0)}</div>
                <div className="info">
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

    </div>

    </>
  )
}