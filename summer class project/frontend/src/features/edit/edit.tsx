import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Edit() {
  const { userId } = useParams(); // Profile ID from URL (/edit/:userId)
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    about: "",
    experience: "",
    skills: ""
  });

  const [loading, setLoading] = useState(true);

  // ✅ Only allow editing own profile
  useEffect(() => {
    if (userId !== loggedInUserId) {
      alert("You can only edit your own profile!");
      navigate(`/profile/${userId}`);
    } else {
      fetchProfile();
    }
  }, [userId]);

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({
        about: res.data.about || "",
        experience: res.data.experience || "",
        skills: res.data.skills || ""
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully!");
      navigate(`/profile/${userId}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* About */}
        <div>
          <label className="block font-medium">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            rows={3}
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block font-medium">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block font-medium">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. React, Node.js, SQL"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
