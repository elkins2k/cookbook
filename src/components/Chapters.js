import React from 'react';
import { Link } from 'react-router-dom'

export default function Chapters(props) {
  const allChapters = props.chapters.map ( (chapter,index) => {
    return(
      <h3 key={index}>
        <Link to = {`/chapters/${chapter._id}`}>
          {chapter.mainProtein}
        </Link>
      </h3>
    )
  })
  return (
    <div>
        {allChapters}
    </div>
  )
}