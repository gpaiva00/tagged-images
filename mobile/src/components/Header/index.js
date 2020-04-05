import React, { useState } from 'react';

import Default from './Default';
import Search from './Search';


export default function Header() {
  const [showSearchHeader, setShowSearchHeader] = useState(false);

  function handleSearchPress() {
    setShowSearchHeader(true);
  }

  function handleClosePress() {
    setShowSearchHeader(false);
  }

  if (!showSearchHeader) return ( <Default handleSearchPress={handleSearchPress} /> );
  else return ( <Search handleClosePress={handleClosePress} />);
}