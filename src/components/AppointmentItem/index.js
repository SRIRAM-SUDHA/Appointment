import './index.css'

const AppointmentItem = props => {
  const {details, stared} = props
  const {id, date, title, isStared} = details
  const imgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    stared(id)
  }

  return (
    <li className="listItem">
      <div className="titleContainer">
        <h1 className="liHeading">{title}</h1>
        <button
          className="starBtn"
          type="button"
          data-testid="star"
          onClick={onClickStar}
        >
          <img className="imgStar" src={imgUrl} alt="star" />
        </button>
      </div>
      <p className="liPara">{date}</p>
    </li>
  )
}

export default AppointmentItem
