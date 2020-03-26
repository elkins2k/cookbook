import React from 'react';

export default function RecipeDetails (props) {
  const recipeDetail = props.recipes.find(recipe => 
    recipe._id === props.match.params.recipeId
  )
  if (props.currentUser === recipeDetail.submittedBy || !recipeDetail.submittedBy) {
    const ingredients = recipeDetail.ingredients.map (ingredient => {
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
    })
    return (
      <div>
        <form
          onSubmit={props.handleUpdateRecipe}
          onChange={props.handleFormChange}
          id={recipeDetail._id}
          data-protein-id={recipeDetail.mainProtein}
        >
          Name: <input type="text" name="newRecipeName" defaultValue={recipeDetail.name} />
          <p></p>
          {/* Main Protein: <input type="text" name="newMainProtein" defaultValue={recipeDetail.mainProtein} /> */}
          Main Protein: {recipeDetail.mainProtein}
          <p></p>
          <ul>
            List of Ingredients:
            {ingredients}
          </ul>
          <p></p>
          Directions: <textarea name="newDirections" rows='10' columns='100' placeholder='Enter directions here...' defaultValue={recipeDetail.directions}></textarea> 
          <p></p>
          <input type="Submit" />
          <p></p>
        </form>
        <form
          onSubmit={props.postNewIngredient}
          onChange={props.handleFormChange}
          id={recipeDetail._id}
        >
          <input type="text" name="newIngredient" placeholder="add ingredient w/amount (ex: 1Cup brown sugar)" size='42'/>
          <input type='submit' value='Add New Ingredient'/>
        </form>
        <p></p>
        <button 
          id={recipeDetail._id}
          onClick={props.handleDelete}
        >
          Delete Recipe
        </button>
        <p>
          submitted by: {recipeDetail.submittedBy}
        </p>
      </div>
    )
  } else {
    const ingredients = recipeDetail.ingredients.map (ingredient => {
      return (
        <li key={ingredient._id}>
          {ingredient.item}
        </li>
      )
    })
    return (
      <div>
        <h2>
          Name: {recipeDetail.name}
        </h2>
        <h3>
          Main Protein: {recipeDetail.mainProtein}
        </h3>
        <ul>
          List of Ingredients
          {ingredients}
        </ul>
        <h3>
          Directions: {recipeDetail.directions}
        </h3>
        <p>
          submitted by: {recipeDetail.submittedBy}
        </p>
      </div>
    )
  }
}