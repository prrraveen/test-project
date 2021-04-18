import React, {useEffect, useState} from "react"
import ReactDOM from "react-dom"
import {isEmpty} from "ramda"

const domain = process.env.DOMAIN
const apikey = process.env.API_KEY


const App = () => {
  const [query, setQuery] = useState('the i')
  const [searchResult, setSearchResult] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)

  // useEffect(async () => {
  //
  //   const result = await fetchMovies()
  //
  //   const {Response} = result
  //
  //   if (Response === "True") {
  //     const {Search, totalResults} = result
  //     setSearchResult(Search)
  //     setTotalResults(totalResults)
  //   } else {
  //     setSearchResult([])
  //   }
  //
  // }, [query])
  //
  // useEffect(async () => {
  //   if (page === 1) return
  //
  //   const result = await fetchMovies()
  //
  //   const {Response} = result
  //
  //   if (Response === "True") {
  //     const {Search, totalResults} = result
  //     setSearchResult([...searchResult, ...Search])
  //   }
  // }, [page])
  //
  // const fetchMovies = async () => {
  //
  //   const url = new URL(domain)
  //
  //   url.searchParams.append('apikey', apikey)
  //   url.searchParams.append('s', query)
  //   url.searchParams.append('type', "movie")
  //   url.searchParams.append('page', page.toString())
  //
  //   try {
  //     const req = await fetch(url.href)
  //
  //     const result = await req.json()
  //
  //
  //     return result
  //
  //
  //   } catch (err) {
  //     console.error("error in fetching", err)
  //   }
  // }


  const handleChange = (event) => {
    const {target: {value}} = event
    setQuery(value)
  }

  return (
    <div className="mx-8 my-32">
      <p>total query result {totalResults}</p>
      <p>current result length = {searchResult.length}</p>

      <p>page = {page}</p>
      <input type="number"
             value={page}
             onChange={e => setPage(e.target.value)}
             className="border border-gray-500"
      />
      <div className="space-y-4">
        <input placeholder="Search a movie" value={query} onChange={handleChange}
               className="py-10 px-4 w-full border border-gray-500 focus:border-gray-900 outline-none"
        />
        {!isEmpty(searchResult) &&
        <ul className="px-2 py-2 w-full border border-gray-600 space-y-6 overflow-y-auto" style={{maxHeight: "12em"}}>
          {searchResult.map(({Title, imdbID}, i) => <li key={imdbID}>{i + 1}. {Title}</li>)}
        </ul>
        }
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"))