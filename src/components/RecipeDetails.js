import React from 'react';

export default function RecipeDetails (props) {
  console.log (props)
  const recipeDetail = props.recipes.find(recipe => 
    recipe._id === props.match.params.recipeId
  )
  console.log (recipeDetail)
  const ingredients = recipeDetail.ingredients.map (ingredient => {
    return (
      <li key={ingredient._id}>{ingredient.item}</li>
    )
  })
  return (
    <div>
      <h2>
        Name: {recipeDetail.name}
      </h2>
      <ul>
        {ingredients}
      </ul>
      <h3>
        Directions: {recipeDetail.directions}
      </h3>
      <button 
        id={recipeDetail._id}
        onClick={props.handleDelete}
      >
        Delete Recipe
      </button>
    </div>
  )
}