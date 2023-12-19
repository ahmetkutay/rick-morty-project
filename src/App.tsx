import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationsList from './components/Locations/LocationsList';
import LocationDetails from './components/Locations/LocationDetails';
import CharacterDetails from './components/Characters/CharacterDetails';
import FavoriteCharacters from './components/Characters/FavoriteCharacters';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<LocationsList />} />
          <Route path="/locations/:id" element={<LocationDetails />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/favorites" element={<FavoriteCharacters />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
