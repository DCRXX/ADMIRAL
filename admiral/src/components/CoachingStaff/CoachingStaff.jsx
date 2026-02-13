import { React, useRef, useState, useEffect } from 'react'
import './CoachingStaff.css'
import pole from './public/pole.svg'
import Trainer1 from './public/Trainer1.svg'
import arrow from './public/arrow.svg'

export default function CoachingStaff(){

    return(
        <section className='CoachingStaff'>
             <div className='Content-Staff'>
                <div className='header'>
                    <h1>ТРЕНЕРСКИЙ ШТАБ</h1>
                </div>
                <div className='Staff'>
                    <div className='Our-trainers'>
                        <h1>НАШИ ТРЕНЕРА</h1>
                        <p>Тренерский штаб нашей школы — это команда высококвалифицированных специалистов, объединённых общей целью: раскрыть потенциал каждого ученика и помочь ему достичь значимых результатов. В основе деятельности наших тренеров лежит фундаментальный принцип «обучая —обучайся сам». Каждый тренер понимает: чтобы эффективно вести за собой учеников, необходимо постоянно совершенствовать собственные знания и навыки.</p>
                    </div>
                    <div className='list-of-coaches'
                        
                    >
                        <div className='Trainer'>
                            <div className='Trainer-Description'>
                                <img src={pole}/>
                                <div className='Description'>
                                    <h1>КУЗНЕЦОВ НИКИТА</h1>
                                    <p>Педагог, главный тренер Опыт работы с 2013 г.</p>
                                    <p1>Лицензия с UEFA</p1>
                                </div>
                            </div>
                            <div className='Image-Trainer'>
                               <img className='train' src={Trainer1}/>
                            </div>
                        </div>
                        <div className='Trainer'>
                            <div className='Trainer-Description'>
                                <img src={pole}/>
                                <div className='Description'>
                                    <h1>КУЗНЕЦОВ НИКИТА</h1>
                                    <p>Педагог, главный тренер Опыт работы с 2013 г.</p>
                                    <p1>Лицензия с UEFA</p1>
                                </div>
                            </div>
                            <div className='Image-Trainer'>
                               <img className='train' src={Trainer1}/>
                            </div>
                        </div>
                        <div className='Trainer'>
                            <div className='Trainer-Description'>
                                <img src={pole}/>
                                <div className='Description'>
                                    <h1>КУЗНЕЦОВ НИКИТА</h1>
                                    <p>Педагог, главный тренер Опыт работы с 2013 г.</p>
                                    <p1>Лицензия с UEFA</p1>
                                </div>
                            </div>
                            <div className='Image-Trainer'>
                               <img className='train' src={Trainer1}/>
                            </div>
                        </div>
                        <div className='Trainer'>
                            <div className='Trainer-Description'>
                                <img src={pole}/>
                                <div className='Description'>
                                    <h1>КУЗНЕЦОВ НИКИТА</h1>
                                    <p>Педагог, главный тренер Опыт работы с 2013 г.</p>
                                    <p1>Лицензия с UEFA</p1>
                                </div>
                            </div>
                            <div className='Image-Trainer'>
                               <img className='train' src={Trainer1}/>
                            </div>
                        </div>
                        <div className='Trainer'>
                            <div className='Trainer-Description'>
                                <img src={pole}/>
                                <div className='Description'>
                                    <h1>КУЗНЕЦОВ НИКИТА</h1>
                                    <p>Педагог, главный тренер Опыт работы с 2013 г.</p>
                                    <p1>Лицензия с UEFA</p1>
                                </div>
                            </div>
                            <div className='Image-Trainer'>
                               <img className='train' src={Trainer1}/>
                            </div>
                        </div>
                        <div className='Trainer'>
                            <div className='Trainer-Description'>
                                <img src={pole}/>
                                <div className='Description'>
                                    <h1>КУЗНЕЦОВ НИКИТА</h1>
                                    <p>Педагог, главный тренер Опыт работы с 2013 г.</p>
                                    <p1>Лицензия с UEFA</p1>
                                </div>
                            </div>
                            <div className='Image-Trainer'>
                               <img className='train' src={Trainer1}/>
                            </div>
                        </div>
                        <div className='Trainer'>
                            <div className='Trainer-Description'>
                                <img src={pole}/>
                                <div className='Description'>
                                    <h1>КУЗНЕЦОВ НИКИТА</h1>
                                    <p>Педагог, главный тренер Опыт работы с 2013 г.</p>
                                    <p1>Лицензия с UEFA</p1>
                                </div>
                            </div>
                            <div className='Image-Trainer'>
                               <img className='train' src={Trainer1}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Buttons-Trainer'>
                    <div className='arrow'
                        
                    >
                        <img src={arrow}/>
                    </div>
                    <div className='arrow'
                        style={{transform: 'scaleX(-1)'}}
                        
                    >
                        <img src={arrow}/>
                    </div>
                </div>
             </div>
        </section>
    )
}