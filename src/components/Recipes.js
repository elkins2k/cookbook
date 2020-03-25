import React from 'react';
import { Link } from 'react-router-dom'
import NewRecipe from './NewRecipe'
export default function Recipes(props) {
  const allRecipes = props.recipes.map ( (recipe,index) => {
    return(
      <div key={index}>
        <Link to = {`/recipes/${recipe._id}`}>
          {recipe.name}
        </Link>
      </div>
    )
  })

  return (
    <div>
      <div>
        {allRecipes}
      </div>
      <div>
        <Link to = {`/recipes/`}>
          Create New Recipe
        </Link>
      </div>

    </div>

  )
}
