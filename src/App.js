import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';

import CharacterList from './components/Characters/CharacterList';
import FilmList from './components/Films/FilmList';

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getFilms();
    getCharacters();
  }, []);

  const getFilms = async () => {
    const resp = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/films`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await resp.json();
    const filmList = data;

    const filmArray = filmList.map((film) => {
      return [
        film.title,
        film.title.replace(/\s+/g, '-').toLowerCase(),
        film.box_office_total,
        film.academy_award_nominations,
      ];
    });
    setFilms(filmArray);
    return [];
  };

  const getCharacters = async () => {
    const resp = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/characters`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await resp.json();
    const charArray = data.map((c) => {
      return { name: c.name, dates: c.birth + ' - ' + c.death };
    });
    setCharacters(charArray);
    return [];
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavLink to="/films" data-testid="film-link">
            Films
          </NavLink>
          <NavLink to="/characters" data-testid="char-link">
            Characters
          </NavLink>
        </header>
        <Switch>
          <Route path="/films">
            <FilmList films={films}></FilmList>
          </Route>
          <Route path="/characters">
            <CharacterList characters={characters} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
