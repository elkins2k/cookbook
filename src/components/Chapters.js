import React from 'react';
import { Link } from 'react-router-dom'

export default function Chapters(props) {
  const allChapters = props.chapters.map ( (chapter,index) => {
    return(
      <div key={index}>
        <Link to = {`/chapters/${chapter._id}`}>
          {chapter.mainProtein}
        </Link>
      </div>
    )
  })
  return (
    <div>
        {allChapters}
    </div>
  )
}
