import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import NbspCleaner from './NbspCleaner'
import  Announcements from './components/Announcements/Announcements'
import CoachingStaff from './components/CoachingStaff/CoachingStaff'
import FAQ from './components/FAQ/FAQ'
import FootballBorders from './components/Football_borders//FootballBorders'
import './index.css'




createRoot(document.getElementById('root')).render(
    <NbspCleaner>
        <Announcements/>
        <CoachingStaff/>
        <FootballBorders/>
        <FAQ/>
    </NbspCleaner>
)
