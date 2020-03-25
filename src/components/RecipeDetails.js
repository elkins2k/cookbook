import React from 'react';

export default function RecipeDetails (props) {
  const recipeDetail = props.recipes.find(recipe => 
    recipe._id === props.match.params.recipeId
  )
  const ingredients = recipeDetail.ingredients.map (ingredient => {
    return (
      <li key={ingredient._id}>{ingredient.item}</li>
    )
  })
  return (
    <div>
      <p>
        Name: {recipeDetail.name}
      </p>
      <ul>
        {ingredients}
      </ul>
      <p>
        Directions: {recipeDetail.directions}
      </p>
    </div>
  )
}