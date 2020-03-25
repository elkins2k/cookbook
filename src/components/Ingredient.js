import React from 'react';

export default function Ingredient(props){
  return (
    <li>
      {props.ingredient.description}
    </li>
  )
}