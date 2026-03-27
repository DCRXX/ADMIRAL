import { StrictMode, lazy, } from 'react'
import { createRoot } from 'react-dom/client'
import NbspCleaner from './NbspCleaner'
const HeaderHero = lazy(() => import('./components/Header/Header'));
const AboutUs = lazy(() => import('./components/aboutUs/aboutUs'));
const Announcements = lazy(() => import('./components/Announcements/Announcements'));
const Advantages = lazy(() => import('./components/Advantages/Advantages'));
const FootballBorders = lazy(() => import('./components/Football_borders/FootballBorders'));
const CoachingStaff = lazy(() => import('./components/CoachingStaff/CoachingStaff'));
const TheFirstStep = lazy(() => import('./components/theFirstStep/theFirstStep'));
const Parentsfc = lazy(() => import('./components/Parentsfc/Parentsfc'));
const FAQ = lazy(() => import('./components/FAQ/FAQ'));
const Footer = lazy(() => import('./components/Footer/Footer'));
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NbspCleaner>
            <HeaderHero />
            <AboutUs />
            <Announcements />
            <Advantages />
            <FootballBorders />
            <CoachingStaff />
            <TheFirstStep />
            <Parentsfc />
            <FAQ />
            <Footer />
        </NbspCleaner>
    </StrictMode>
)