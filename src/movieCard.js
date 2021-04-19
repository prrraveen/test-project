import React from "react"

export const MovieCard = ({movie}) => {
  const {Poster, Title, Year} = movie
  return (
    <div className="space-y-3 flex flex-col items-center w-40 pb-4">
      <img className="h-52 w-full" src={Poster}/>
      <p className="px-4">{Year}</p>
      <p className="px-4">{Title}</p>
    </div>
  )
}