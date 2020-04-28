import React, { useState, createContext } from "react";

// const initialState = [{ selectedTags: [], test: [] }, () => {}]
// define o formato do contexto
const TagsContext = createContext(null);

function TagsProvider(props) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const providerValue = [selectedTags, setSelectedTags, tags, setTags];

  return (
   <TagsContext.Provider value={providerValue}>
      {props.children}
    </TagsContext.Provider>
  );
}
export { TagsContext, TagsProvider };