
import './profilePage.css';
import Header from '../../shared/components/header/header';
import type { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { getProfileById } from '../../shared/config/api';
import { updateProfile } from '../../shared/config/api';
import Experience from './components/Experience';
import About from './components/about';
import Skills from './components/Skills'; 
import type {User} from '../../shared/Interface/interface';
import {useNavigate} from 'react-router-dom';



interface ApiResponse{
  user:User;

}


export default function Profile() {
  

  const [loading, setLoading] = useState<boolean>(true);
  const [currentUserId, setCurrentUserId] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
 
  const [isCurrentUser, setCurrentUser] = useState<boolean>(false);
  const { id: profileUserId } = useParams<{ id: string }>();
  

useEffect(() => {
  if (!profileUserId) return;

  getProfileById(profileUserId)
    .then((res: AxiosResponse<ApiResponse>) => {
     
      setUserData(res.data.user);
    })
    .catch((error) => {
      console.error('Failed to fetch profile user data:', error);
    });
}, [profileUserId]);


useEffect(() => {
  if (!profileUserId) return;

  function fetch() {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
      setCurrentUser(false);
      return;
    }

    const currentUser = JSON.parse(currentUserStr);
    const userIdFromStorage = currentUser._id || ''; // or 'id' depending on your user object structure

    

    setCurrentUserId(userIdFromStorage);

    if (userIdFromStorage === profileUserId) {
      setCurrentUser(true);
    } else {
      setCurrentUser(false);
    }
  }

  fetch();
}, [profileUserId]);


  console.log('isCurrentUser:', isCurrentUser);
  return (
    <>
      <Header/>
      {/* Profile Card */}
      <div className="profile-card">
          <div className="user-info">
            <h2>{userData?.username || 'No name'}</h2>
            <p>245 connections</p>
          </div>

          <div className="action-buttons">
            <button className="btn">Connect</button>
            <button className="btn">Message</button>

            
          </div>
        </div>

        <div className="tab-bar">
          <button className="tab">Profile</button>
          <button className="tab">Skills</button>
          <button className="tab">Posts</button>
          <button className="tab">Recommendations</button>
        </div>
      

      {/* About Section */}
    {/* About Section */}
<About
  aboutText={userData?.about}
  isCurrentUser={isCurrentUser}
  onSave={async (newAbout: string) => {
    try {
      // ✅ Save or update about text
      await updateProfile(profileUserId!, { about: newAbout });
      setUserData((prev: any) =>
        prev ? { ...prev, about: newAbout } : null
      );
    } catch (error) {
      console.error("Failed to update about:", error);
    }
  }}
  onDelete={async () => {
    try {
      // ✅ Delete about (set to empty string)
      await updateProfile(profileUserId!, { about: "" });
      setUserData((prev: any) =>
        prev ? { ...prev, about: "" } : null
      );
    } catch (error) {
      console.error("Failed to delete about:", error);
    }
  }}
/>

      {/* Experience Section */}
      {/* Experience Section */}
      
<Experience
  experiences={userData?.experiences || []}
  isCurrentUser={isCurrentUser}
  onAdd={async (newExp) => {
    const updatedList = [...(userData?.experiences || []), newExp];
    await updateProfile(profileUserId!, { experiences: updatedList });
    setUserData((prev) =>
      prev ? { ...prev, experiences: updatedList } : null
    );
  }}
  onEdit={async (id, updatedExp) => {
    const updatedList = (userData?.experiences || []).map((exp) =>
      exp._id === id ? { ...updatedExp, _id: exp._id } : exp
    );
    await updateProfile(profileUserId!, { experiences: updatedList });
    setUserData((prev) =>
      prev ? { ...prev, experiences: updatedList } : null
    );
  }}
  onDelete={async (id) => {
    const updatedList = (userData?.experiences || []).filter(
      (exp) => exp._id !== id
    );
    await updateProfile(profileUserId!, { experiences: updatedList });
    setUserData((prev) =>
      prev ? { ...prev, experiences: updatedList } : null
    );
  }}
/>



   
  

   {/* Skills Section */} 
      <Skills
        skills={userData?.skills}
        isCurrentUser={isCurrentUser}
        onAddSkill={async (skill) => {
          if (!userData) return;
          const updatedSkills = [...(userData.skills || []), skill];
          await updateProfile(userData._id, { skills: updatedSkills });
          setUserData({ ...userData, skills: updatedSkills });
        }}
        onDeleteSkill={async (skill) => {
          if (!userData) return;
          const updatedSkills = (userData.skills || []).filter((s: string) => s !== skill);
          await updateProfile(userData._id, { skills: updatedSkills });
          setUserData({ ...userData, skills: updatedSkills });
        }}
      />


    </>
  );

}
