import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
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
  const [teams, setTeams] = useState([]);

      useEffect(() => {
          window.scrollTo(0, 0); 
        }, []); 

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsSnapshot = await getDocs(collection(db, "teams"));
        const teamsList = teamsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTeams(teamsList);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

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
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    year: "2025",
    month: "",
    sport: "",
    date: "",
    video: "",
    team1: { id: "", score: "", recordAtTime: "" },
    team2: { id: "", score: "", recordAtTime: "" }
  });

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
    if (!newSchedule.sport || !newSchedule.month || !newSchedule.date || !newSchedule.team1.id || !newSchedule.team2.id) {
      alert("Please fill out all fields before adding a schedule.");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to add this game?");
    if (!isConfirmed) return;

    try {
      const docRef = await addDoc(collection(db, "schedule"), newSchedule);
      await updateDoc(doc(db, "schedule", docRef.id), { id: docRef.id });

      setNewSchedule({
        year: "2025",
        month: "",
        sport: "",
        date: "",
        video: "",
        team1: { id: "", score: "", recordAtTime: "" },
        team2: { id: "", score: "", recordAtTime: "" },
      });

      alert("Schedule added successfully!");
      fetchSchedule();
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  const handleUpdateSchedule = async () => {
    if (!editingSchedule) return;

    const updatedSchedule = {
      ...editingSchedule
    };

    await handleEditSchedule(editingSchedule.id, updatedSchedule);
    setEditingSchedule(null);
    setNewSchedule({
      year: "2025",
      month: "",
      sport: "",
      date: "",
      video: "",
      team1: { id: "", score: "", recordAtTime: "" },
      team2: { id: "", score: "", recordAtTime: "" },
    });

    alert("Schedule updated successfully!");
    fetchSchedule();
  };

  const startEditingSchedule = (scheduleItem) => {
    setEditingSchedule(scheduleItem);

    setNewSchedule({
      year: scheduleItem.year || "2025",
      month: scheduleItem.month || "",
      sport: scheduleItem.sport || "",
      date: scheduleItem.date || "",
      video: scheduleItem.video || "",
      team1: scheduleItem.team1 || "",
      team2: scheduleItem.team2 || ""
    });
  };

  const cancelEditing = () => {
    setEditingSchedule(null);
    setNewSchedule({
      year: "2025",
      month: "",
      sport: "",
      date: "",
      video: "",
      team1: { id: "", score: "", recordAtTime: "" },
      team2: { id: "", score: "", recordAtTime: "" },
    });
  };

  const handleEditSchedule = async (id, updatedItem) => {
    const isConfirmed = window.confirm("Are you sure you want to update this game?");
    if (!isConfirmed) return;

    await updateDoc(doc(db, "schedule", id), updatedItem);
    setSchedule(schedule.map((item) => (item.id === id ? updatedItem : item)));
  };

  const handleDeleteSchedule = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this game?");
    if (!isConfirmed) return;

    await deleteDoc(doc(db, "schedule", id));
    setSchedule(schedule.filter((item) => item.id !== id));
  };
  /**** End of Schedule Functions ****/

  /**** Start of Team Functions ****/
  const [editingTeam, setEditingTeam] = useState(null);

  const startEditingTeam = (team) => {
    setEditingTeam({ ...team });
  };

  const handleUpdateTeam = async () => {
    if (!editingTeam) return;

    try {
      const teamRef = doc(db, "teams", editingTeam.id);
      await updateDoc(teamRef, {
        name: editingTeam.name,
        abbrev: editingTeam.abbrev,
        record: editingTeam.record,
      });

      setTeams(teams.map((team) => (team.id === editingTeam.id ? editingTeam : team)));
      alert("Team updated successfully!");
      setEditingTeam(null);
    } catch (error) {
      console.error("Error updating team:", error);
      alert("Failed to update team.");
    }
  };
  /**** End of Team Functions ****/

  return (
    <div className="admin-container">
      <div className="admin">
        <h1 className="admin-title">Admin Panel</h1>
        <div className="team-section">
        {/* Team Display Section */}
        <div className="team-display">
          <h2 className="edit-team-title">Team Details</h2>
          {teams.map((team) => (
            <div className="team-item" key={team.id}>
              <h3>{team.name}</h3>
              <div className="edit-team-row">
                <h4>Abbrev: {team.abbrev}</h4>
                <h4>Record: {team.record}</h4>
              </div>
              <button
                className="admin-edit-button"
                onClick={() => startEditingTeam(team)}
              >
                <FaEdit />
              </button>
            </div>
          ))}
        </div>

        {/* Edit Team Form - Now outside of team-display but inside team-section */}
        {editingTeam && (
          <div className="edit-team-form">
            <h2>Edit Team</h2>
            <div className="edit-team-form-column">
            <label>Team Name:</label>
            <input
              type="text"
              value={editingTeam.name}
              onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
            />

            <label>Abbreviation:</label>
            <input
              type="text"
              value={editingTeam.abbrev}
              onChange={(e) => setEditingTeam({ ...editingTeam, abbrev: e.target.value })}
            />

            <label>Record (W-L-T):</label>
            <input
              type="text"
              value={editingTeam.record}
              onChange={(e) => setEditingTeam({ ...editingTeam, record: e.target.value })}
            />
            </div>

            <button onClick={handleUpdateTeam}>Update Team</button>
            <button onClick={() => setEditingTeam(null)}>Cancel</button>
          </div>
        )}
      </div>

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
                  <p className="admin-schedule-date">{item.date}</p>
                </div>
                {item.video && (
                  <p><a href={item.video} target="_blank" rel="noopener noreferrer">Watch Video</a></p>
                )}
                <ul>
                  {[item.team1, item.team2].map((team, index) =>
                    team ? (
                      <li key={index}>
                        Team Name: {teams.find(t => t.id === team.id)?.name || "Unknown"} <br />
                        Score: {team.score} <br />
                        Record at Time: {team.recordAtTime || "N/A"}
                        <br /><br />
                      </li>
                    ) : null
                  )}
                </ul>
                <div className="admin-actions">
                  <button title="Edit Schedule" className="admin-edit-button" onClick={() => startEditingSchedule(item)}>
                    <FaEdit />
                  </button>
                  <button title="Delete Schedule" className="admin-delete-button" onClick={() => handleDeleteSchedule(item.id)}>
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Add or Edit Schedule Form */}
          <div className="add-schedule">
            <h2 className="schedule-update-title">{editingSchedule ? "Edit Schedule" : "Add Schedule"}</h2>
            <div className="sport-selection">
              <label>
                <select
                  value={editingSchedule ? editingSchedule.sport : newSchedule.sport}
                  onChange={(e) =>
                    editingSchedule
                      ? setEditingSchedule({ ...editingSchedule, sport: e.target.value })
                      : setNewSchedule({ ...newSchedule, sport: e.target.value })
                  }
                >
                  <option value="">Select a sport</option>
                  <option value="Ultimate Frisbee">Ultimate Frisbee</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Softball">Softball</option>
                  <option value="Volleyball">Volleyball</option>
                </select>
              </label>
            </div>
            <label>Select Month:</label>
            <select
              value={editingSchedule ? editingSchedule.month : newSchedule.month}
              onChange={(e) =>
                editingSchedule
                  ? setEditingSchedule({ ...editingSchedule, month: e.target.value })
                  : setNewSchedule({ ...newSchedule, month: e.target.value })
              }
            >
              <option value="">Select a Month</option>
              {["June", "July", "August"].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <label>Enter Date and Time (05/02 | 7:00 PM)</label>
            <input
              type="text"
              placeholder="05/02 | 7:00 PM"
              value={editingSchedule ? editingSchedule.date : newSchedule.date}
              onChange={(e) =>
                editingSchedule
                  ? setEditingSchedule({ ...editingSchedule, date: e.target.value })
                  : setNewSchedule({ ...newSchedule, date: e.target.value })
              }
            />
            <label>Select Team 1:</label>
            <select
              value={editingSchedule ? editingSchedule.team1.id : newSchedule.team1.id}
              onChange={(e) => {
                const value = e.target.value;
                if (editingSchedule) {
                  setEditingSchedule((prev) => ({ ...prev, team1: { ...prev.team1, id: value } }));
                } else {
                  setNewSchedule((prev) => ({ ...prev, team1: { ...prev.team1, id: value } }));
                }
              }}
            >
              <option value="">Select a Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            {/* Score and Record Fields (Only in Edit Mode) */}
            {editingSchedule && (
              <>
                <label>Team 1 Score:</label>
                <input
                  type="number"
                  value={editingSchedule.team1.score}
                  onChange={(e) =>
                    setEditingSchedule((prev) => ({ ...prev, team1: { ...prev.team1, score: e.target.value } }))
                  }
                />

                <label>Team 1 Record at Time: (1-0-0)</label>
                <input
                  type="text"
                  value={editingSchedule.team1.recordAtTime}
                  onChange={(e) =>
                    setEditingSchedule((prev) => ({ ...prev, team1: { ...prev.team1, recordAtTime: e.target.value } }))
                  }
                />
              </>
            )}

            {/* Team 2 Selection */}
            <label>Select Team 2:</label>
            <select
              value={editingSchedule ? editingSchedule.team2.id : newSchedule.team2.id}
              onChange={(e) => {
                const value = e.target.value;
                if (editingSchedule) {
                  setEditingSchedule((prev) => ({ ...prev, team2: { ...prev.team2, id: value } }));
                } else {
                  setNewSchedule((prev) => ({ ...prev, team2: { ...prev.team2, id: value } }));
                }
              }}
            >
              <option value="">Select a Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            {/* Score and Record Fields (Only in Edit Mode) */}
            {editingSchedule && (
              <>
                <label>Team 2 Score:</label>
                <input
                  type="number"
                  value={editingSchedule.team2.score}
                  onChange={(e) =>
                    setEditingSchedule((prev) => ({ ...prev, team2: { ...prev.team2, score: e.target.value } }))
                  }
                />

                <label>Team 2 Record at Time: (0-0-1)</label>
                <input
                  type="text"
                  value={editingSchedule.team2.recordAtTime}
                  onChange={(e) =>
                    setEditingSchedule((prev) => ({ ...prev, team2: { ...prev.team2, recordAtTime: e.target.value } }))
                  }
                />
              </>
            )}
            <label htmlFor="YTvideo">Attach YouTube Link:</label>
            <input
              type="text"
              id="YTvideo"
              placeholder="Video Link"
              value={editingSchedule ? editingSchedule.video : newSchedule.video}
              onChange={(e) =>
                editingSchedule
                  ? setEditingSchedule({ ...editingSchedule, video: e.target.value })
                  : setNewSchedule({ ...newSchedule, video: e.target.value })
              }
            />
            <button onClick={editingSchedule ? handleUpdateSchedule : handleAddSchedule}>
              {editingSchedule ? "Update Schedule" : "Add Schedule"}
            </button>
            {editingSchedule && <button onClick={cancelEditing}>Cancel</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;