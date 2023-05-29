import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isFavourite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  OnUpdateFavouriteState = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavourite: !eachAppointment.isFavourite}
        }
        return eachAppointment
      }),
    }))
  }

  onClickTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onClickDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isFavourite === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredAppointmentlist = this.getFilteredAppointmentsList()
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    return (
      <div className="appointment-bg-container">
        <div className="appointment-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="input-fields-container">
            <form className="form" onSubmit={this.onAddAppointment}>
              <label htmlFor="title" className="label-text">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                placeholder="Your Title"
                name="title"
                value={titleInput}
                className="title-input"
                onChange={this.onClickTitle}
              />
              <label htmlFor="date" className="label-text">
                DATE
              </label>
              <input
                type="date"
                id="date"
                value={dateInput}
                className="date-input"
                onChange={this.onClickDate}
              />
              <div>
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="seperation-line" />
          <div className="appointments-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={`started-button ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list-container">
            {filteredAppointmentlist.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                eachAppointmentDetails={eachAppointment}
                OnUpdateFavouriteState={this.OnUpdateFavouriteState}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
