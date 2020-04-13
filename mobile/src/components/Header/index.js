import React, { useState } from 'react';

import Default from './Default';
import Search from './Search';


export default function Header() {
  return <Default />
  // if (!showSearchHeader) return ( <Default handleSearchPress={handleSearchPress} /> );
  // else return ( <Search handleClosePress={handleClosePress} />);
}