import { useEffect, useState } from "react";
import './App.css';

function App() {

  const APP_ID = 'ae22911c';
  const APP_KEY = 'dae8c3aec6ab78b18c7a3de04d6250cb';

  const [recipe, setRecipe] = useState('');

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
  
  useEffect(()=>{
    getRecipes();
  },[]);

  const getRecipes = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  const updateRecipe = (e) => {
    e.preventDefault();
    //setRecipe(e.target.value);
  }

  return (
    <div className="App">
      <h1>Search your recipe</h1>
      <form onSubmit={updateRecipe} className="search-form">
        <input type="text" className="search-bar" />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}

export default App;
