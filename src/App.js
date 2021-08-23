import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

function App() {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  //ESTADO QUE ALMACENA LAS RECETAS
  const [recipes, setRecipes] = useState([]);
  //ESTADO QUE ALMACENA NUESTRA BUSQUEDA DE RECETA
  const [search, setSearch] = useState("");
  //ESTADO FINAL DE RECETA QUE QUEREMOS CONSULTAR
  const [query, setQuery] = useState("chicken");

  //EJECUTA OBTENER RECETAS. AL INICIO DE LA APLICARION Y CADA VEZ QUE CONSULTEMOS UNA NUEVA
  useEffect(() => {
    getRecipes();
  }, [query]);

  //OBTENER LAS RECETAS
  const getRecipes = async () => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data.hits);
  };

  //ACTUALIZA LA BARRA DE BUSQUEDA CADA VEZ QUE DIGITEMOS
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  //ACTUALIZA LA CONSULTA A LA API PARA QUE FUNCIONE USEEFFECT
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <div className="heading">
        <h1>Search your recipe</h1>
      </div>
      <form onSubmit={getSearch} className="search-form">
        <input
          onChange={updateSearch}
          value={search}
          type="text"
          className="search-bar"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={Math.random() * 1000}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
