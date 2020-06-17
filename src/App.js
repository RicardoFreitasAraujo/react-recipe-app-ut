import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipie from './Recipie';

const App = () => {

  const APP_ID = 'cae11203';
  const APP_KEY = '0668b9f5418f0a205963a568de942c27';

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
      setLoading(true);
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      console.log(data.hits);
      setRecipes(data.hits);
      setLoading(false);
  }

  const updateSearch = (event) => {
    setSearch(event.target.value);
  }

  const getSearch = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={ search } onChange={ updateSearch }/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {loading ? (<div>Carregando</div>) : (
          recipes.map( recipe => (
            <Recipie 
                    key={recipe.recipe.label} 
                    title={recipe.recipe.label} 
                    calories={recipe.recipe.calories}
                    image={recipe.recipe.image}
                    ingredients={recipe.recipe.ingredients}></Recipie>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
