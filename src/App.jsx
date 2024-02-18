import React, { useEffect, useRef, useState } from 'react';
import './sass/App.css';
import { motion } from 'framer-motion';
import { throttle } from 'lodash';

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setcursorVariant] = useState("default")

  console.log(mousePosition);

  useEffect(() => {
    const handleMouseMove = throttle((e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }, 16);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      height: 150,
      width: 150,
      backgroundColor: 'yellow',
      mixBlendMode: 'difference'
    }
  };

  // const cursorStyle = {
  //   position: 'fixed',
  //   left: `calc(${mousePosition.x}px - 16px)`, // Adjust the cursor size/width
  //   top: `calc(${mousePosition.y}px - 16px)`, // Adjust the cursor size/height
  //   width: '32px', // Adjust the cursor size as needed
  //   height: '32px', // Adjust the cursor size as needed
  //   backgroundColor: '#fff',
  // };

  const textEnter = () => setcursorVariant("text");
  const textLeave = () => setcursorVariant("default")
  return (
    <div>
      <h1 onMouseEnter={textEnter} onMouseLeave={textLeave}>Hello world</h1>
      <motion.div className="cursor" variants={variants} animate={cursorVariant} />
    </div>
  );
};

export default App;
