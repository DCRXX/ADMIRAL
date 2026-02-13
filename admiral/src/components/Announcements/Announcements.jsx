import { React, useState, useEffect, useRef } from 'react'
import './Announcements.css'
import img1 from './public/img1.png'
import img2 from './public/img2.png'
import img3 from './public/img3.png'
import img4 from './public/img4.png'
import img5 from './public/img5.png'
import img6 from './public/img6.png'
import img7 from './public/img7.png'
import img8 from './public/img8.png'
import arrow from './public/arrow.svg'



export default function Announcements(){

    const[activeIndex, setActiveIndex] = useState(0)
    const images = [img1, img2, img3, img4, img5, img6, img7, img8]
    const galleryRef = useRef(null)
    
    useEffect(() => {
        if (galleryRef.current) {
            const container = galleryRef.current
            const activeThumb = container.children[activeIndex]
            
            if (activeThumb) {
                activeThumb.scrollIntoView({
                    behavior: 'smooth',  
                    inline: 'center',    
                    block: 'nearest' 
                })
            }
        }
    }, [activeIndex])

    return(
        <section className='Announcements'>
            <div className='Content-Announcements'>
                <div className='header'>
                    <h1>ОБЪЯВЛЕНИЯ</h1>
                </div>
                <div className='content'>
                    <div className='Main-image'>
                        <img className='Glav-image' src={images[activeIndex]}/>
                        <div 
                            style={{justifySelf:'start'}}
                            onClick={() => setActiveIndex((prev) => prev === 0 ? images.length - 1 : prev - 1)}
                            className='arrow-Main-image'>
                            <img src={arrow}/>
                        </div>
                        <div
                            style={{justifySelf:'end', transform: 'rotate(180deg)'}}
                            onClick={() => setActiveIndex((prev) => prev === images.length - 1 ? 0 : prev + 1)}
                            className='arrow-Main-image'>
                            <img src={arrow}/>
                        </div>
                    </div>
                    <div className='gallery-viewport'>
                        <div className='list-galery' ref={galleryRef}>
                        {images.map((img, index) =>(
                            <img 
                                key={index}
                                className={`image-sheet ${index === activeIndex ? 'active' : 'dimmed'}`}
                                src={img}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                        
                    </div>
                    </div>
                    <div className='Text-Announcements'>
                        <h1>НОВОE ОТДЕЛЕНИЕ ЦАРИЦЫНО</h1>
                        <p>Осенью 2025 года футбольная школа «АдмиралВМФ» открыла новое отделение на базе современного стадиона «Огонёк» в районе Царицыно. Это значимый шаг в развитии школы: новая площадка позволяет существенно повысить качество подготовки. Стадион отвечает всем требованиям для тренировок и игр в формате 11 × 11! На базе нового объекта осуществляется подготовка команда к участию в соревнованиях под эгидой Московской Федерации футбола!</p>
                        <button className='record-button'>
                            <p>Записаться на первое занятие</p>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}