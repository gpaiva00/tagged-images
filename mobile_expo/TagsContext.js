import React, { useReducer, useState } from "react";

// let reducer = (state, action) => {
//   switch (action.type) {
//     case "setSelectedTags":
//       return { ...state, selectedTags: action.payload };
//     default:
//       return;
//   }
// };

// const initialState = { selectedTags: [] }
const initialState = [[], () => {}]
const TagsContext = React.createContext(initialState);

function TagsProvider(props) {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedTags, setSelectedTags] = useState([]);

  return (
   <TagsContext.Provider value={[selectedTags, setSelectedTags]}>
      {props.children}
    </TagsContext.Provider>
  );
}
export { TagsContext, TagsProvider };