import { useState, useEffect } from 'react';
import './Parentsfc.css';
import { useScrollAnimation } from '../../useScrollAnimation.js';
import { getParentalFc } from '../../RouterAPI.jsx';

export default function ParentsFC() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useScrollAnimation([isLoading, cards]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParentalFc();
        setCards(data);
      } catch (error) {
        console.error('Ошибка загрузки ParentsFC:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="parents" ref={sectionRef}>
      <div className="parents__title">
        <h1>Родительские ФК</h1>
      </div>

      <div className="parents__cards">
        {cards.map((card) => (
          <div className="parents__card" key={card.id}>
            <div className="parents__card-image">
              <img src={card.imagePath} alt={card.title} />
              <div className="parents__card-overlay" />
              <h3 className="parents__card-title">{card.title}</h3>
            </div>
            <div className="parents__card-body">
              <p className="parents__card-text">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}