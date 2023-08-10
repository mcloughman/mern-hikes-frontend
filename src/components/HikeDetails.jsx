const HikeDetails = ({ hike }) => {
  return (
    <div className="hike-object">
      <div className="hike-details">
        <h2>{hike.title}</h2>

        <p>{hike.description.substring(0, 50)}...</p>
        <p>
          Rating: <span className="rating-span">{hike.rating}</span>
        </p>
      </div>
      <img src={hike.images[0]} alt="stunning scenery" />
      <hr />
    </div>
  )
}

export default HikeDetails
