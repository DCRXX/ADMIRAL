import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import NbspCleaner from './NbspCleaner'
import Announcements from './components/Announcements/Announcements'
import CoachingStaff from './components/CoachingStaff/CoachingStaff'
import FAQ from './components/FAQ/FAQ'
import FootballBorders from './components/Football_borders//FootballBorders'
import Footer from './components/Footer/Footer'
import Parentsfc from './components/Parentsfc/Parentsfc'
import Advantages from './components/Advantages/Advantages'
import TheFirstStep from './components/theFirstStep/theFirstStep'
import AboutUs from './components/aboutUs/aboutUs'
import HeaderHero from './components/Header/Header'
import './index.css'




createRoot(document.getElementById('root')).render(
    <NbspCleaner>
        <HeaderHero />
        <Announcements />
        <AboutUs />
        <Advantages />
        <FootballBorders />
        <CoachingStaff />
        <TheFirstStep />
        <Parentsfc />
        <FAQ />
        <Footer />
    </NbspCleaner>
)
