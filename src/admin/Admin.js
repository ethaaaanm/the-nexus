import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import "./admin.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


const AdminNewsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" });
  const [editing, setEditing] = useState(null);

  // Fetch announcements from Firestore
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const announcementsCollection = collection(db, "announcements");
      const snapshot = await getDocs(announcementsCollection);
      
      const fetchedAnnouncements = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      fetchedAnnouncements.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setAnnouncements(fetchedAnnouncements);
    };

    fetchAnnouncements();
  }, []);
  
  // Add a new announcement
  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.content.trim()) return;

    try {
      const announcementsCollection = collection(db, "announcements");
      const newAnnouncementWithDate = {
        ...newAnnouncement,
        date: new Date().toISOString().split("T")[0], // Add current date in YYYY-MM-DD format
      };
      await addDoc(announcementsCollection, newAnnouncementWithDate);
      setNewAnnouncement({ title: "", content: "" });
      alert("Announcement added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  // Update an existing announcement
  const handleUpdateAnnouncement = async () => {
    if (!editing) return;

    const isConfirmed = window.confirm("Are you sure you want to update this announcement?");
    if (!isConfirmed) return;

    try {
      const announcementRef = doc(db, "announcements", editing.id);
      const updatedAnnouncement = {
        ...editing,
        date: new Date().toISOString().split("T")[0],
      };

      await updateDoc(announcementRef, updatedAnnouncement);
      setEditing(null);
      alert("Announcement updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating announcement:", error);
      alert("Error updating announcement");
    }
  };

  // Delete an announcement
  const handleDeleteAnnouncement = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this announcement?");
    if (!isConfirmed) return;
  
    try {
      const announcementRef = doc(db, "announcements", id);
      await deleteDoc(announcementRef);
      alert("Announcement deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert("Error deleting announcement");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin">
        <h1 className="admin-title">Admin Panel</h1>
        {/* Left: Display Announcements */}
        <div className="announcements-section">
          <div className="announcements-list">
            <h2 className="current-announcements">Current Announcements</h2>
            {[...announcements].map((announcement, index) => (
              <div className={`announcement-item ${announcement.content.includes("The Nexus") ? "last-item" : ""}`} key={index}>
                {announcement.title && <h3>{announcement.title}</h3>}
                {announcement.date && <p className="admin-news-date">{announcement.date}</p>}
                <p>{announcement.content}</p>

                {/* Actions for non-final announcements */}
                <div className="admin-actions">
                    <button title="Edit Announcement" className="admin-edit-button" onClick={() => setEditing(announcement)}>
                        <FaEdit /> 
                    </button>
                    <button title="Delete Announcement" className="admin-delete-button" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                        <MdDeleteForever /> 
                    </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Add or Edit Announcement Form */}
          <div className="update-container">
            <h2 className="update-title">{editing ? "Edit Announcement" : "Add Announcement"}</h2>
            <input
              type="text"
              placeholder="Title"
              value={editing ? editing.title : newAnnouncement.title}
              onChange={(e) =>
                editing
                  ? setEditing({ ...editing, title: e.target.value })
                  : setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={editing ? editing.content : newAnnouncement.content}
              onChange={(e) =>
                editing
                  ? setEditing({ ...editing, content: e.target.value })
                  : setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
              }
            ></textarea>
            <button onClick={editing ? handleUpdateAnnouncement : handleAddAnnouncement}>
              {editing ? "Update Announcement" : "Add Announcement"}
            </button>
            {editing && <button onClick={() => setEditing(null)}>Cancel</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsPage;
