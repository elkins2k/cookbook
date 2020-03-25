import React from 'react';
import { Link } from 'react-router-dom'
import NewRecipe from './NewRecipe'

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
          <NewRecipe 
                      //  {...routerProps}
                       recipes={props.recipes}
                       newIngredient={props.newIngredient}
                       handleFormChange={props.handleFormChange}
                       handleNewIngredientSubmit={props.handleNewIngredientSubmit}
          />
        </Link>
     {allRecipes}

    </div>

  )
}
