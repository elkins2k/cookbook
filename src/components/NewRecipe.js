import React from 'react';
// import Ingredient from './Ingredient'

export default function NewRecipe(props) {
  
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
        <textarea name="newDirections" rows='10' columns='100' placeholder='Enter directions here...'></textarea> 
        <p></p>
        <input type="Submit" />
        <p></p>
      </form>
      {/* <form
          onSubmit={props.handleNewItem}
          onChange={props.handleFormChange}
        >
          <input type="text" name="newItem" placeholder="new ingredient item w/size (ex: 1Cup - brown sugar)" size='40'/>
          <input type='submit' />
          <ul>List of Ingredients</ul>
          </form> */}
    </div>
  )
}