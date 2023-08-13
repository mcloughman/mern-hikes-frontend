import { useHikesContext } from "../hooks/useHikesContext"
import { FaTrashAlt } from "react-icons/fa"
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

  return (
    <div className="hike-object">
      <div className="hike-details">
        <h2>{hike.title}</h2>

        <p>{hike.description.substring(0, 50)}...</p>
        <p>
          Rating: <span className="rating-span">{hike.rating}</span>
        </p>
        <BsTrash3 onClick={handleClick} className="trashcan" />
      </div>
      <img src={hike.images[0]} alt="stunning scenery" />

      <hr />
    </div>
  )
}

export default HikeDetails
