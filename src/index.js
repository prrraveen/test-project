import React, {useEffect, useState} from "react"
import ReactDOM from "react-dom"

const domain = process.env.DOMAIN
const apikey = process.env.API_KEY


const App = () => {
  const [query, setQuery] = useState('')

  useEffect(async () => {

    const url = new URL(domain)

    url.searchParams.append('apikey', apikey)
    url.searchParams.append('s', query)

    console.log(url)

    const req = await fetch(url.href)

    const json = await req.json()
    console.log(json)
  }, [query])


  const handleChange = (event) => {
    const {target: {value}} = event
    setQuery(value)
  }

  return (
    <div>
      <input placeholder="Search a movie" value={query} onChange={handleChange}/>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"))