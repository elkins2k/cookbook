import React from 'react';

export default function NewRecipe(props) {
 
  return (
    <div >
   <form 
          onSubmit = { props.handlePostRecipe }        
          onChange = { props.handleFormChange }
   >
      <input type="text" name="newRecipeName" placeholder="recipe name" /><p>
           
      </p>
      <input type="text" name="newMainProtein" placeholder="main protein"/><p>
      </p>
      <input type="text" name="newIngredient" placeholder="new ingridient"/><p>
          </p> 
      {/* //we will figure out how it works for an Array */}
       <input type="text" name="newDirections" placeholder="directions"/><p>          
       </p>
       <input type="Submit" />
   </form>
    </div>
  )
}