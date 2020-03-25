import React from 'react';
import { Link } from 'react-router-dom'

export default function ChapterDetails(props) {
  const matchingRecipes = props.recipes.map ( (recipe,index) => {
    if (recipe.mainProtein === props.match.params.id) {
      return (
        <div key={index}>
          <Link to={`/chapters/${props.match.params.id}/${recipe._id}`}>
            {recipe.name}
          </Link>
        </div>
      )
    }
})

return (
  <div>
    {matchingRecipes}
  </div>
)
}