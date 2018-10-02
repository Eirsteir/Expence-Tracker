import React from 'react';

const Background = () => {
  return (
    <div id="background" style={{backgroundImage: 'linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)', position: 'fixed', bottom: '0', left: '0', height: '50vh', width: '100vw', zIndex: '-1'}}></div>
  );
}

export default Background;
