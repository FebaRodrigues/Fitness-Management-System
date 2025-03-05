// src/components/Admin/AdminAnnouncements.jsx
import React, { useEffect, useState } from 'react';
import API from '../../api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    target: 'All',
  });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await API.get('/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
      };
    fetchAnnouncements();
  }, []);

  const handleAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement({ ...newAnnouncement, [name]: value });
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/announcements', newAnnouncement);
      setAnnouncements([...announcements, response.data.announcement]);
      setNewAnnouncement({ title: '', content: '', target: 'All' });
      alert('Announcement created successfully!');
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  return (
    <div>
      <h2>Announcements & Updates</h2>
      <h3>All Announcements</h3>
      {announcements.length > 0 ? (
        <ul>
          {announcements.map((announcement) => (
            <li key={announcement._id}>
              {announcement.title} - {announcement.content} - Target: {announcement.target}
            </li>
          ))}
        </ul>
      ) : (
        <p>No announcements yet.</p>
      )}

      <h3>Create New Announcement</h3>
      <form onSubmit={handleCreateAnnouncement}>
        <input
          type="text"
          name="title"
          value={newAnnouncement.title}
          onChange={handleAnnouncementChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={newAnnouncement.content}
          onChange={handleAnnouncementChange}
          placeholder="Content"
          required
        />
        <select name="target" value={newAnnouncement.target} onChange={handleAnnouncementChange}>
          <option value="All">All</option>
          <option value="Users">Users</option>
          <option value="Trainers">Trainers</option>
        </select>
        <button type="submit">Create Announcement</button>
      </form>
    </div>
  );
};

export default Announcements;