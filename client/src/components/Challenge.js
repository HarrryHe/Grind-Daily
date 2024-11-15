
import React, { useEffect, useState } from 'react';
import Card from './helper/Card';
import tasks from './helper/challenges.json';

function Challenge() {
  const initialCards = [
    { id: 1, image: '/images/anime.jpg' },
    { id: 2, image: '/images/anime2.jpg' },
    { id: 3, image: '/images/omen1.jpg' },
    { id: 4, image: '/images/anime.jpg' },
    { id: 5, image: '/images/anime2.jpg' },
    { id: 6, image: '/images/omen1.jpg' },
  ];

  const [cards, setCards] = useState(
    initialCards.map((card) => ({
      ...card,
      task: tasks[Math.floor(Math.random() * tasks.length)]
    }))
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [isCardMoving, setIsCardMoving] = useState(false);

  useEffect(() => {
    initialCards.forEach((card, index) => {
      setTimeout(() => {
        setVisibleCards((prevVisibleCards) => [...prevVisibleCards, card.id]);
      }, index * 300);
    });
  }, []);

  const handleCardClick = (cardId) => {
    if (selectedCard === cardId) {
      setIsCardMoving(true);
      setTimeout(() => {
        setSelectedCard(null);
        setIsCardMoving(false);
      }, 700);
    } else {
      setIsCardMoving(true);
      setSelectedCard(cardId);
      setTimeout(() => {
        setIsCardMoving(false);
      }, 700);
    }

    setCards((prevCards) => {
      const clickedCard = prevCards.find((card) => card.id === cardId);
      const otherCards = prevCards.filter((card) => card.id !== cardId);
      return [...otherCards, clickedCard];
    });
  };

  return (
    <div className="w-full min-h-screen grid place-content-center relative">
      {cards.map((card) => (
        visibleCards.includes(card.id) && (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            task={card.task}
            isSelected={selectedCard === card.id}
            isHovered={hoveredCard === card.id}
            isCardMoving={isCardMoving}
            onClick={handleCardClick}
            onMouseEnter={(id) => setHoveredCard(id)}
            onMouseLeave={() => setHoveredCard(null)}
          />
        )
      ))}
    </div>
  );
}

export default Challenge;

