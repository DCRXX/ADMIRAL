import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  Announcements from './components/Announcements/Announcements'
import CoachingStaff from './components/CoachingStaff/CoachingStaff'
import './index.css'


createRoot(document.getElementById('root')).render(
    <>
        <Announcements/>
        <CoachingStaff/>
    </>
)
