import React from 'react';

export default function NewRecipe(props) {
  // const listOfIngredients = recipeDetail.ingredients.map ( ingredient => {
  //   return (
  //   <li key={ingredients._id}>
  //     {ingredient.item} {' '}
  //     <button
  //       id = {props.recipeDetail._id}
  //       onClick = {props.deleteItem}
  //     ></button>
  //   </li>
  //   )
  // })
  return (
    <div >
      <form
        onSubmit={props.handleNewRecipe}
        onChange={props.handleFormChange}
      >
        <input type="text" name="newRecipeName" placeholder="recipe name" />
        <p></p>
        <input type="text" name="newMainProtein" placeholder="main protein" />
        <p></p>
        <ul>List of Ingredients
          {/* {listOfIngredients} */}
        </ul>
        <p></p>
        <textarea name="newDirections" rows='10' columns='100' placeholder='Enter directions here...'></textarea> 
        <p></p>
        <input type="Submit" />
        <p></p>
      </form>
      <form
          onSubmit={props.postNewIngredient}
          onChange={props.handleFormChange}
        >
          <input type="text" name="newIngredient" placeholder="add ingredient w/amount (ex: 1Cup brown sugar)" size='42'/>
          <input type='submit' value='Add'/>
          
          </form>
    </div>
  )
}