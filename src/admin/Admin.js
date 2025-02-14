import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import dayjs from "dayjs";
import { db } from "../firebaseConfig";
import "./admin.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg";
import VolleyballIcon from "../res/images/ic_volleyball.svg";

const sportIcons = {
  "Ultimate Frisbee": UltimateIcon,
  Softball: SoftballIcon,
  Basketball: BasketballIcon,
  Volleyball: VolleyballIcon,
};

const AdminPage = () => {
  /**** Start of Announcement Functions  ****/
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" });
  const [editing, setEditing] = useState(null);

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

  const handleAddAnnouncement = async () => {
    const isConfirmed = window.confirm("Are you sure you want to add this announcement?");
    if (!isConfirmed) return;
  
    if (!newAnnouncement.content.trim()) return;
  
    try {
      const announcementsCollection = collection(db, "announcements");

      const currentDate = new Date();

      const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

      const newAnnouncementWithDate = {
        ...newAnnouncement,
        date: formattedDate,
      };
      await addDoc(announcementsCollection, newAnnouncementWithDate);
      setNewAnnouncement({ title: "", content: "" });
      alert("Announcement added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

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
  /**** End of Announcement Functions ****/

  /**** Start of Schedule Functions ****/
  const [schedule, setSchedule] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    year: "2025",
    month: "",
    sport: "",
    date: "",
    video: "",
    teams: [
      { id: "", score: "", recordAtTime: "" },
      { id: "", score: "", recordAtTime: "" }
    ],
  });

  const [dateTimeRaw, setDateTimeRaw] = useState(""); 
  const [dateTimeFormatted, setDateTimeFormatted] = useState("");
  
  const [editingSchedule, setEditingSchedule] = useState(null);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const scheduleSnapshot = await getDocs(collection(db, "schedule"));
      setSchedule(scheduleSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleAddSchedule = async () => {
    if (!newSchedule.month || !newSchedule.sport || !dateTimeRaw) {
      alert("Please fill out all fields before adding a schedule.");
      return;
    }
    
    try {
      const newScheduleItem = { ...newSchedule, date: dateTimeFormatted };
      await addDoc(collection(db, "schedule"), newScheduleItem);
  
      setNewSchedule({ year: "2025", month: "", sport: "", date: "", video: "", teams: [{ id: "", score: "", recordAtTime: "" }] });
      setDateTimeFormatted("");
  
      alert("Schedule added successfully!");
      fetchSchedule(); 
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    await deleteDoc(doc(db, "schedule", id));
    setSchedule(schedule.filter((item) => item.id !== id));
  };

  const handleEditSchedule = async (id, updatedItem) => {
    await updateDoc(doc(db, "schedule", id), updatedItem);
    setSchedule(schedule.map((item) => (item.id === id ? updatedItem : item)));
  };

  const handleDateTimeChange = (e) => {
    const rawDate = e.target.value;
    setDateTimeRaw(rawDate); 
    setDateTimeFormatted(dayjs(rawDate).format("M/D | h:mm A")); 
  };
  
  /**** End of Schedule Functions ****/

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
          <div className="announcement-update-container">
            <h2 className="announcement-update-title">{editing ? "Edit Announcement" : "Add Announcement"}</h2>
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

        {/* Schedule Section */}
        <div className="admin-schedule-section">
          <div className="admin-schedule-list">
            <h2 className="admin-current-schedule">Current Schedule</h2>
            {schedule.map((item) => (
              <div key={item.id} className="admin-schedule-item">
                <div className="row-top">
                  <div className="sport-title-wrapper">
                    <img src={sportIcons[item.sport]} alt={`${item.sport} icon`} className="sport-icon" />
                    <h3 className="sport-title">{item.sport}</h3>
                  </div>
                  <p className="schedule-date">{item.date}</p>
                </div>
                {item.video && (
                  <p><a href={item.video} target="_blank" rel="noopener noreferrer">Watch Video</a></p>
                )}
                <ul>
                  {item.teams.map((team, index) => (
                    <li key={index}>
                      Team ID: {team.id}, Score: {team.score}, Record: {team.recordAtTime}
                    </li>
                  ))}
                </ul>
                <div className="admin-actions"> 
                  <button title="Edit Schedule" className="admin-edit-button" onClick={() => handleEditSchedule(item.id, item)}><FaEdit /></button>
                  <button title="Delete Schedule" className="admin-delete-button" onClick={() => handleDeleteSchedule(item.id)}><MdDeleteForever /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="add-schedule">
          <div className="month-selection">
              <label>
              <select
                value={newSchedule.month}
                onChange={(e) => setNewSchedule({ ...newSchedule, month: e.target.value })}
              >
                <option value="">Select a month</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
              </select>
              </label>
            </div>
            <div className="sport-selection">
              <label>
                <select
                  value={newSchedule.sport}
                  onChange={(e) => setNewSchedule({ ...newSchedule, sport: e.target.value })}
                >
                  <option value="">Select a sport</option>
                  <option value="Ultimate Frisbee">Ultimate Frisbee</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Softball">Softball</option>
                  <option value="Volleyball">Volleyball</option>
                </select>
              </label>
            </div>
            <label htmlFor="meeting-time">Select Date and Time:</label>
            <input
              type="datetime-local"
              id="meeting-time"
              name="meeting-time"
              value={dateTimeRaw} 
              onChange={handleDateTimeChange}
            />
            <input
              type="text"
              placeholder="Video Link"
              value={newSchedule.video}
              onChange={(e) => setNewSchedule({ ...newSchedule, video: e.target.value })}
            />
            <button onClick={handleAddSchedule}>Add Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
