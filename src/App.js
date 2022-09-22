import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component.jsx'
import './App.css';

const App = () => {
  const [ searchField, setSearchField ] = useState('');
  const [ monsters, setMonsters ] = useState([]);
  const [ filteredMonsters, setFilteredMonsters ] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setMonsters(users));
  }, []);

  // only filter when the monsters array changes and the searchField changes
  useEffect(() => {
    const newFiltered = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase())); setFilteredMonsters(newFiltered);
   }, [searchField, monsters]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={ onSearchChange }
        placeholder='search monsters'
      />
      <CardList monsters={ filteredMonsters } />
    </div>
  );
}

export default App;