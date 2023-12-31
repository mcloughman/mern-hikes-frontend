import { useState } from "react"
import { useHikesContext } from "../hooks/useHikesContext"
const apiKey = "maybe"

const HikeForm = () => {
  const { dispatch } = useHikesContext()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    rating: 0,
  })
  const [error, setError] = useState(null)
  const [authError, setAuthError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleFormData = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleImageInputChange = (e, index) => {
    const newImages = [...formData.images]
    newImages[index] = e.target.value
    setFormData({
      ...formData,
      images: newImages,
    })
  }

  const handleAddImageInput = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const hike = formData
    console.log(hike)
    const response = await fetch(
      "https://vast-brook-03843-baafe7d564ff.herokuapp.com/api/hikes",
      {
        method: "POST",
        body: JSON.stringify(hike),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
    const json = await response.json()
    if (response.ok) {
      setFormData({ title: "", description: "", images: [], rating: 0 })
      setError(null)
      setEmptyFields([])
      setAuthError(null)
      console.log("new workout added")
      dispatch({ type: "CREATE_HIKE", payload: json })
    } else if (response.status === 400) {
      // we set an error property on the response in the backend controllers and we will access it now
      setError(json.error)
      setEmptyFields(json.emptyFields)
    } else {
      setAuthError(json.message)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add New Hike</h3>
      {authError && <h4>{authError}</h4>}
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={formData.title}
        onChange={handleFormData}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label htmlFor="description">Description</label>
      <textarea
        rows="5"
        name="description"
        id="description"
        value={formData.description}
        onChange={handleFormData}
        className={emptyFields.includes("description") ? "error" : ""}
      />
      <label htmlFor="images" className="form-img-label">
        Images:
        {formData.images.map((image, index) => (
          <div key={index} className="form-img-div">
            <input
              type="text"
              value={image}
              onChange={(e) => handleImageInputChange(e, index)}
            />
          </div>
        ))}
        <button type="button" className="img-btn" onClick={handleAddImageInput}>
          Add Image
        </button>
      </label>
      <br />
      <label>
        Rating:
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleFormData}
          className={`rating ${emptyFields.includes("rating") ? "error" : ""}`}
        />
      </label>
      <br />
      <button type="submit" className="submit-btn">
        Submit
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default HikeForm
