import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {

  const APP_ID='6cb0f962';
  const APP_KEY='57c72a70b5f425ab36d1a575533cb3be';

  const [recipes,setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query,setQuery] = useState('chicken');

  useEffect(()=>{
    getRecipes();
  }, [query]);

  const getRecipes  = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);   

  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch}  className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
          <Recipe key={recipe.recipe.label} ingredients={recipe.recipe.ingredients} title={recipe.recipe.label} image={recipe.recipe.image}/>
      ))}
     </div>
    </div>
  );
}

export default App;