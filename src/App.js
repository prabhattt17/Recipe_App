import { useEffect, useState} from "react";
import Recipe from "./Recipe";
import "./App.css"

function App() {
  // const APP_ID="97287331";
  // const APP_KEY="b5e9eb2452a119f00483015b9b02487d";

  // const exampleReq= "https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEYS}";
  
  const[recipes,setRecipes]=useState([]);
  const[search,setSearch]=useState("");
  const[query,setQuery]=useState('chicken');

  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes= async () => {
     const response= await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=b47eac3c&app_key=42821680b314c3bd857aabb4c8a7605d`);
     const data= await response.json();
    //  console.log(data); 
     setRecipes(data.hits);
     console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);

  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  return (
    <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
      <button className="search-button" type="submit">Search</button>
    </form>
    <div className="recipes">
    {recipes.map(recipe =>(
      <Recipe
      key={recipe.recipe.label}
      title={recipe.recipe.label} calories={recipe.recipe.calories}
      image={recipe.recipe.image} 
      ingredients={recipe.recipe.ingredients} />
    ))};
    </div>
    </div>
  );
}

export default App;
