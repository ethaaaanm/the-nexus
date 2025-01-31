import Genesis from "../res/images/team_genesis.svg";
import Refined from "../res/images/team_refined.svg";

// Team Database
export const homeTeamDB = [
  {
    id: "G1",
    icon: Genesis,
    name: "Genesis",
    abbrev: "GEN",
    record: "2-1-3",
  },
  {
    id: "R1",
    icon: Refined,
    name: "Refined",
    abbrev: "REF",
    record: "1-2-3",
  },
];

// Schedule Database
export const scheduleDB = {
  2025: [
    {
      month: "JUNE",
      sport: "Ultimate Frisbee",
      date: "6/4 | 7:00 PM",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      teams: [{
        id: "G1",
        score: "12",
        recordAtTime: "1-0-0", 
      },
      {
        id: "R1",
        score: "7",
        recordAtTime: "0-1-0", 
      }], 
    },
    {
      month: "JUNE",
      sport: "Softball",
      date: "6/11 | 7:00 PM",
      video: "",
      teams: [{
        id: "G1",
        score: "",
        recordAtTime: "1-1-0", 
      },
      {
        id: "R1",
        score: "",
        recordAtTime: "1-1-0", 
      }],
    },
    {
      month: "JUNE",
      sport: "Basketball",
      date: "6/18 | 7:00 PM",
      video: "",
      teams: [{
        id: "G1",
        score: "",
        recordAtTime: "1-1-1", 
      },
      {
        id: "R1",
        score: "",
        recordAtTime: "1-1-1", 
      }],
    },
    {
      month: "JUNE",
      sport: "Volleyball",
      date: "6/25 | 7:00 PM",
      video: "",
      teams: [{
        id: "G1",
        score: "",
        recordAtTime: "2-1-1", 
      },
      {
        id: "R1",
        score: "",
        recordAtTime: "1-2-1", 
      }],
    },
    {
      month: "JULY",
      sport: "Softball",
      date: "7/4 | 7:00 PM",
      video: "",
      teams: [{
        id: "G1",
        score: "",
        recordAtTime: "2-1-2", 
      },
      {
        id: "R1",
        score: "",
        recordAtTime: "1-2-2", 
      }],
    },
    {
      month: "JULY",
      sport: "Basketball",
      date: "7/11 | 7:00 PM",
      video: "https://www.youtube.com/watch?v=nbY_aP-alkw",
      teams: ["G1", "R1"],
    },
    {
      month: "JULY",
      sport: "Volleyball",
      date: "7/18 | 7:00 PM",
      video: "",
      teams: ["G1", "R1"],
    },
    {
      month: "JULY",
      sport: "Ultimate Frisbee",
      date: "7/25 | 7:00 PM",
      video: "",
      teams: ["G1", "R1"],
    },
    {
      month: "AUGUST",
      sport: "Basketball",
      date: "8/1 | 7:00 PM",
      video: "",
      teams: ["G1", "R1"],
    },
    {
      month: "AUGUST",
      sport: "Volleyball",
      date: "8/8 | 7:00 PM",
      video: "https://youtu.be/5DADtXVTVV4?si=dIhteOFyBcGfSsJx&t=14",
      teams: ["G1", "R1"],
    },
  ],
};

// News Database
export const newsDB = [
  {
    title: "Next Game Location",
    content: "Our next game will be hosted at People's Christian Academy, Renfrew Dr, Markham.",
    date: "6/4/2025",
  },
  {
    title: "Game Recording",
    content: "Watch the recording on our YouTube channel: @TheNexus-League",
  },
  {
    title: "Congrats to Team Genesis!",
    content: "For winning the first-ever game of The Nexus!",
  },
  {
    content: "You're all caught up on the news of The Nexus",
  },
];
