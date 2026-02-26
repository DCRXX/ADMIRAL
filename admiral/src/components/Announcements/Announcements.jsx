import { React, useState, useEffect, useRef } from 'react'
import './Announcements.css'
import arrow from './public/arrow.svg'




export default function Announcements(){
    

    return(
        <section className='Announcements'>
            <div className='head_Announcements'>
                <h1>Объявления</h1>
            </div>
            <div className='main_Announcements'>
                <div className='Elipse'></div>
                <div className='slide_diagram'>
                    <div className='title'>
                        <h1>Новое отделение Царицыно</h1>
                    </div>
                    <div className='description'>
                        <p>Осенью 2025 года футбольная школа «АдмиралВМФ» открыла новое отделение на базе современного стадиона «Огонёк» в районе Царицыно. Это значимый шаг в развитии школы: новая площадка позволяет существенно повысить качество подготовки. Стадион отвечает всем требованиям для тренировок и игр в формате 11 × 11! На базе нового объекта осуществляется подготовка команда к участию в соревнованиях под эгидой Московской Федерации футбола!</p>
                    </div>
                    <div className='arrow-left'>
                        <img src={arrow}/>
                    </div>
                    <div className='arrow-right'>
                        <img src={arrow}/>
                    </div>
                </div>
            </div>
        </section>
    )
}