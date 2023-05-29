import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {eachAppointmentDetails, OnUpdateFavouriteState} = props
  const {id, title, date, isFavourite} = eachAppointmentDetails
  const isFavouriteStatus = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onClickFavourite = () => {
    OnUpdateFavouriteState(id)
  }
  const appointmentDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  return (
    <li className="eachAppointment">
      <div className="title-date-container">
        <p className="title">{title}</p>
        <p className="date">Date:{appointmentDate}</p>
      </div>
      <button
        type="submit"
        className="star-button"
        data-testid="star"
        onClick={onClickFavourite}
      >
        <img src={isFavouriteStatus} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
