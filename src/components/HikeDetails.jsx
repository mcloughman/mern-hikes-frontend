import { Link } from "react-router-dom"
import { useHikesContext } from "../hooks/useHikesContext"
import { BsTrash3 } from "react-icons/bs"

const HikeDetails = ({ hike }) => {
  const { dispatch } = useHikesContext()
  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:4000/api/hikes/" + hike._id,
      {
        method: "DELETE",
      }
    )
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: "DELETE_HIKE", payload: json })
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
        </p>

        <BsTrash3 onClick={handleClick} className="trashcan" />
      </div>
      <img src={hike.images[0]} alt="stunning scenery" />

      <hr />
    </div>
  )
}

export default HikeDetails
