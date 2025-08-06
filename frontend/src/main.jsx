
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import App2 from './App2.jsx'
import './index.css'
import LandingPage from './LandingPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
const user = {
  name: 'Sohil Khan',
  username: 'sohilk',
  avatar: 'https://placehold.co/100x100',
  bio: 'Full-stack developer | JavaScript, React, FastAPI',
  posts: 12,
  followers: 340,
  following: 180
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <P.\rofilePage />; */}
    <LandingPage />
  </React.StrictMode>,
)
