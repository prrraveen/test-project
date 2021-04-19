import React from "react"

export const MovieCard = ({movie}) => {
  const {Poster, Title, Year} = movie
  return (
    <div className="space-y-8">
      <img src={Poster}/>
      <p>{Title}</p>
      <p>{Year}</p>
    </div>
  )
}