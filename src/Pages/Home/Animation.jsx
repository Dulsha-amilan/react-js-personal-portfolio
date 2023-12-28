import React, { useState, useEffect } from 'react';


const AnimatedText = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState([]);

  useEffect(() => {
    // Your function to add words
    const addWords = () => {
      const newWords = [
        "Frontend Developer",
        "Backend Developer",
        "UI/UX Developer",
        "Mobile App Developer",
        "Graphic Designer",
        "Youtuber"
      ];
      setWords(newWords);
    };

    // Call the function to add words
    addWords();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(currentWordIndex => (currentWordIndex === words.length - 1 ? 0 : currentWordIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div>
      <h1 className="hero--section--title">
        <div className="hero--section--title">
          <h3>And I'am</h3>
          <h3 className="hero--section--title">
            {words.map((word, index) => (
              <span
                key={index}
                className={`word ${index === currentWordIndex ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {word}
            
              </span>
             
            ))}
          </h3>
        </div>
      </h1>
      {/* <button id="menu-icon" ></button> */}
    </div>
  );
};

export default AnimatedText;
