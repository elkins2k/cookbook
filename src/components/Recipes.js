import React from 'react';
import { Link } from 'react-router-dom'
export default function Recipes(props) {
  const allRecipes = props.recipes.map ( recipe => {
    return(
      <div>
        <Link to = {`/recipe/${recipe._id}`}>
          {recipe}
        </Link>
      </div>
    )
  }

  )
  return (
    <div>
      <Link to = {`/recipes/`}>
          create new recipe
        </Link>
     {allRecipes}

    </div>

  )
}
