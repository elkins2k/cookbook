import React from 'react';

export default function RecipeDetails (props) {
  const recipeDetail = props.recipes.find(recipe => 
    recipe._id === props.match.params.recipeId
  )
  const ingredients = recipeDetail.ingredients.map (ingredient => {
    if (props.currentUser === recipeDetail.submittedBy || recipeDetail.submitted === '' ) {
      return (
      <li key={ingredient._id}>
        {ingredient.item}
        <button
         id = {recipeDetail._id}
         onClick = {props.deleteItem}
        >
          del
        </button>
      </li>
      )
    } else {
      return (
        <li key={ingredient._id}>
          {ingredient.item}
        </li>
        )
    }
  })
  const deleteRecipe = (() => {
    if (props.currentUser === recipeDetail.submittedBy || recipeDetail.submitted === '' ) {
      return (
        <button 
        id={recipeDetail._id}
        onClick={props.handleDelete}
      >
        Delete Recipe
      </button>
      )
    }
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
      {deleteRecipe}
      <p>
        submitted by: {recipeDetail.submittedBy}
      </p>
    </div>
  )
}