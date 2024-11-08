import { preLoaderAnim } from "./animation";
import '../styles/preloader.css';
import React, { useEffect, useState } from 'react';

const motivationalQuotes = [
  "Believe in yourself and all that you are.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "You are capable of amazing things.",
  "Stay positive, work hard, make it happen.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Your only limit is your mind.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesnt just find you. You have to go out and get it."
];

const splitQuoteIntoSpans = (quote) => {
  return quote.split(' ').map((word, index) => (
    <span key={index}>{word}</span>
  ));
};


function Preloader(){

  const [quote, setQuote] = useState('');
   useEffect(() => {
      
       const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
       setQuote(randomQuote);
   }, []);


  useEffect(() => {
    preLoaderAnim();
}, []);

return (
    <div className="preloader">
        <div className="texts-container">    
        {splitQuoteIntoSpans(quote)}
            
        </div>
    </div>
);
}



export default Preloader;