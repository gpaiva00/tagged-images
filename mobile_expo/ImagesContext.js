import React, { createContext, useState } from 'react';

const ImagesContext = createContext(null);

function ImagesProvider(props) {
  const [applyFilter, setApplyFilter] = useState(false);
  const [images, setImages] = useState([]);

  const providerValue = [applyFilter, setApplyFilter];

  return (
    <ImagesContext.Provider value={providerValue}>
      {props.children}
    </ImagesContext.Provider>
  )
}

export { ImagesContext, ImagesProvider };