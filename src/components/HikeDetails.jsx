import { useState } from "react"
import { Link } from "react-router-dom"
import { useHikesContext } from "../hooks/useHikesContext"
import { BsTrash3 } from "react-icons/bs"
const apiKey = "yes"

const HikeDetails = ({ hike }) => {
  const { dispatch } = useHikesContext()
  const [authError, setAuthError] = useState(null)
  const handleClick = async () => {
    const response = await fetch(
      "https://vast-brook-03843-baafe7d564ff.herokuapp.com/api/hikes/" +
        hike._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: "DELETE_HIKE", payload: json })
    } else {
      setAuthError(json.message)
    }
  }

  const truncated = (inputString, maxLength) => {
    const truncated = inputString.substring(0, maxLength)
    const lastSpaceIndex = truncated.lastIndexOf(" ")
    return lastSpaceIndex !== -1
      ? truncated.substring(0, lastSpaceIndex)
      : truncated
  }

  return (
    <div className="hike-object">
      <div className="hike-details">
        <h2>{hike.title}</h2>

        <p className="truncated">
          {truncated(hike.description, 100)}...
          <Link to={`/${hike._id}`}>Read more</Link>
          {authError && <h4>{authError}</h4>}
        </p>

        <BsTrash3 onClick={handleClick} className="trashcan" />
      </div>
      <img src={hike.images[0]} alt="stunning scenery" />

      <hr />
    </div>
  )
}

export default HikeDetails
