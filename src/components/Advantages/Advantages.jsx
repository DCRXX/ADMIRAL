import React, { useState, useEffect } from 'react';
import './Advantages.css';
import { useScrollAnimation } from '../../useScrollAnimation.js';
import { getAdvantages } from '../../RouterAPI.jsx';

export default function Advantages() {
  const [advantages, setAdvantages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useScrollAnimation([isLoading, advantages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdvantages();
        setAdvantages(data);
      } catch (error) {
        console.error('Ошибка загрузки Advantages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (advantages.length === 0) {
    return null;
  }

  return (
    <section className="advantages" ref={sectionRef}>
      <div className="advantages__gradient-top" />
      <div className="head_Announcements">
        <h1>Наши преимущества</h1>
      </div>
      <div className="advantages__cards">
        {advantages.map((item) => (
          <div className="advantages__card" key={item.id}>
            <div className="advantages__card-image">
              <img src={item.imagePath} alt={item.title} />
              <div className="advantages__card-gradient" />
              <h3 className="advantages__card-title">{item.title}</h3>
            </div>
            <div className="advantages__card-body">
              <p className="advantages__card-text">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}