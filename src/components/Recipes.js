import React from 'react';

export default function Recipes(props) {
    console.log(props.currentUser)
  return (
    <div>
      {props.currentUser}
    </div>
  )
}