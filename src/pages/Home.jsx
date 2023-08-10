import { useState, useEffect } from "react"
import HikeDetails from "../components/HikeDetails"

const Home = () => {
  const [hikes, setHikes] = useState(null)

  useEffect(() => {
    const fetchHikes = async () => {
      // we set up a proxy in package.json to get around cors errors. so we don't need full url here
      // this will only work in development not production
      console.log("hello")
      const response = await fetch("http://localhost:4000/api/hikes", {
        method: "GET",
        headers: {
          Origin: "http://localhost:5173.com", // Replace with your frontend domain
        },
      })
      console.log(response)

      const json = await response.json()
      console.log(json)
      if (response.ok) {
        setHikes(json)
      }
    }
    fetchHikes()
  }, [])

  return (
    <div className="home">
      <div className="hikes">
        {hikes &&
          hikes.map((hike) => <HikeDetails hike={hike} key={hike._id} />)}
      </div>
    </div>
  )
}

export default Home
