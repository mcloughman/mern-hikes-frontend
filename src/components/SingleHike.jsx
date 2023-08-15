import { useState } from "react"
import { useParams } from "react-router-dom"
import { useHikesContext } from "../hooks/useHikesContext"
import UpdateHikeForm from "./UpdateHikeForm"

const SingleHike = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const { hikes } = useHikesContext()
  const { id } = useParams()

  let hike = hikes.find((h) => h._id === id)
  console.log(hike)

  if (!hike) {
    return <p>Hike not found</p>
  }

  return (
    <div className="single-hike-container" id="top">
      {showUpdateForm && <UpdateHikeForm hike={hike} />}
      <div className="title-description">
        <h1>{hike.title}</h1>
        <p>{hike.description}</p>
        <button
          onClick={() => setShowUpdateForm(true)}
          className="update-btn mern-btn"
        >
          Update Hike
        </button>
      </div>
      <div className="images-container">
        {hike.images.map((image, i) => {
          return (
            <div className="img-container" key={i}>
              <img src={image} className="single-hike-images" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleHike
