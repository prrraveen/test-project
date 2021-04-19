import React, {useEffect, useRef, useState} from "react"
import useCursorOutsideComponentAlerter from "./customHooks/useCursorOutsideComponentAlerter"
import {isEmpty} from "ramda"
import Spinner from "./Spinner"
import Modal from "./Modal"
import {MovieCard} from "./movieCard"

const domain = process.env.DOMAIN
const apikey = process.env.API_KEY

export const Search = () => {
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState({})


  const [shouldShowDropdown, setShouldShowDropdown] = useState(false)

  const theDropDownContainer = useRef(null)

  const typeAheadContainer = useRef(null)

  useCursorOutsideComponentAlerter(typeAheadContainer, () => {
    setShouldShowDropdown(false)
  })

  useEffect(async () => {

    setPage(1)

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

  }, [query])

  useEffect(async () => {
    if (page === 1) return

    const result = await fetchMovies()

    const {Response} = result

    if (Response === "True") {
      const {Search, totalResults} = result
      setSearchResult([...searchResult, ...Search])
    }
  }, [page])

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


  const handleChange = (event) => {
    const {target: {value}} = event
    setQuery(value)
  }

  const handleScroll = () => {
    if (isFetching) return
    const element = theDropDownContainer.current
    const didWeHitTheBottom = element.scrollHeight - Math.abs(element.scrollTop) === element.clientHeight

    const thereIsMoreToFetch = searchResult.length < totalResults

    if (didWeHitTheBottom && thereIsMoreToFetch) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    if (!isEmpty(searchResult)) {
      setShouldShowDropdown(true)
    }
  }, [searchResult])

  const handleFocus = () => {
    if (!isEmpty(searchResult)) {
      setShouldShowDropdown(true)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setSearchResult([])
    setShouldShowDropdown(false)
    setPage(1)
    setTotalResults(0)
  }

  const showMovieDetails = (movie) => {
    const {Title} = movie
    setQuery(Title)
    setSelectedMovie(movie)
  }

  return (
    <div className="my-16 py-16 px-6 bg-gray-700 flex flex-col items-center space-y-6">
      <p className="text-white text-3xl">My WatchList</p>
      <p className="text-white text-xl">Search Movies</p>
      <div ref={typeAheadContainer} className="bg-white relative w-full sm:w-5/12">
        <div
          className="border border-b-0 border-gray-500 focus-within:border-gray-900 focus-within:shadow-md flex space-x-2 px-4">
          <input placeholder="Search a movie"
                 value={query}
                 onChange={handleChange}
                 onFocus={handleFocus}
                 className="py-4 w-full border-0 outline-none"
          />
          <button onClick={clearSearch}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer focus:outline-none">X
          </button>
        </div>
        {shouldShowDropdown &&
        <ul
          ref={theDropDownContainer}
          onScroll={handleScroll}
          className="px-2 py-2 w-full border border-gray-500 border-t-0
            space-y-3 overflow-y-auto absolute bg-white shadow-2xl z-10"
          style={{maxHeight: "12em"}}
        >
          {searchResult.map((movie, i) => {
            const {Title, imdbID} = movie
            return (
              <li key={i.toString() + Title}
                  className="py-2 px-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => showMovieDetails(movie)}
              >
                {i + 1}. {Title}
              </li>
            )
          })}
          {isFetching && <div className="flex justify-center p-4"><Spinner/></div>}
        </ul>
        }
      </div>
      {!isEmpty(selectedMovie) &&
      <Modal onCancel={() => setSelectedMovie({})}>
        <MovieCard movie={selectedMovie}/>
      </Modal>
      }
    </div>
  )
}