import { useEffect } from "react"
import HikeDetails from "../components/HikeDetails"
import HikeForm from "../components/HikeForm"
import { useHikesContext } from "../hooks/useHikesContext"

const Home = () => {
  //  we no longer need the below state because we're now using context
  // const [hikes, setHikes] = useState(null)
  const { hikes, dispatch } = useHikesContext()

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
        dispatch({ type: "SET_HIKES", payload: json })
        console.log(hikes)
      }
    }
    fetchHikes()
  }, [dispatch])

  return (
    <div className="home">
      <HikeForm />
      <div className="hikes">
        {hikes &&
          hikes.map((hike) => <HikeDetails hike={hike} key={hike._id} />)}
      </div>
    </div>
  )
}

export default Home
