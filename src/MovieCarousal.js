import React, {useEffect, useRef, useState} from "react"
import {MovieCard} from "./movieCard"
import {isEmpty} from "ramda"
import Modal from "./Modal"

const domain = process.env.DOMAIN
const apikey = process.env.API_KEY

const Carousal = () => {
  const [query] = useState('Hello')
  const [searchResult, setSearchResult] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState({})


  useEffect(async () => {

    const result = await fetchMovies()

    const {Response} = result

    if (Response === "True") {
      const {Search, totalResults} = result
      setSearchResult(Search)
      setTotalResults(totalResults)
      setShouldShowDropdown(true)
    } else {
      setSearchResult([])
      setShouldShowDropdown(false)
    }

  }, [])


  const fetchMovies = async () => {
    const url = new URL(domain)

    url.searchParams.append('apikey', apikey)
    url.searchParams.append('s', query)
    url.searchParams.append('type', "movie")
    url.searchParams.append('page', page.toString())

    setIsFetching(true)

    try {
      const req = await fetch(url.href)
      const result = await req.json()
      return result
    } catch (err) {
      console.error("error in fetching", err)
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <div>
      <ul className="flex flex-nowrap space-x-6 overflow-y-auto w-screen justify-center">
        {searchResult.map((movie, index) => (
          <li key={movie.Title + index.toString()}
              className="border border-gray-300 cursor-pointer"
              onClick={() => setSelectedMovie(movie)}
          >
            <MovieCard movie={movie}/>
          </li>
        ))}
      </ul>
      {!isEmpty(selectedMovie) &&
      <Modal onCancel={() => setSelectedMovie({})}>
        <MovieCard movie={selectedMovie}/>
      </Modal>
      }
    </div>
  )
}

const MovieCarousal = () =>
  <div className="flex flex-col items-center space-y-12">
    <p className="text-2xl font-bold text-gray-700">Up Next</p>
    <div>
      <Carousal/>
    </div>
  </div>

export default MovieCarousal