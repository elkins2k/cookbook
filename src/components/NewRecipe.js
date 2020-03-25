import React from 'react';
import Ingredient from './Ingredient'

export default function NewRecipe(props) {
  // let recipeDetail = props.recipes.find(recipe => recipe._id === props.match.params.id)

  // recipeDetail.ingredients.forEach(ingredient => {
  //   let ingredientComponent = (
  //     <Ingredient
  //       ingredient={ingredient}
  //       recipeId={recipeDetail._id}
  //     />
  //   )
  // recipeDetail.ingredients.push(ingredientComponent)
  // });
  return (
    <div >
      <form
        onSubmit={props.handlePostRecipe}
        onChange={props.handleFormChange}
      >
        <input type="text" name="newRecipeName" placeholder="recipe name" />
        <p></p>
        <input type="text" name="newMainProtein" placeholder="main protein" />
        <p></p>
        <textarea name="newDirections" rows='10' columns='100'>
          Enter directions here...
        </textarea> 
        <p></p>
        <input type="Submit" />
        <p></p>
      </form>
      <form
          onSubmit={props.handleNewItem}
          onChange={props.handleFormChange}
        >
          <input type="text" name="newItem" placeholder="new ingredient item w/size (ex: 1Cup - brown sugar)" size='40'/>
          <input type='submit' />
          <ul>List of Ingredients</ul>
          </form>
    </div>
  )
}