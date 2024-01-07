import './index.css'
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    filteredStar: false,
  }

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addDate = event => {
    this.setState({
      date: format(new Date(event.target.value), 'dd MMMM yyyy, EEEE'),
    })
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  changeStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  starFiltered = () => {
    this.setState(prevState => ({filteredStar: !prevState.filteredStar}))
  }

  render() {
    const {appointmentList, title, filteredStar} = this.state

    const filteredList = filteredStar
      ? appointmentList.filter(
          eachAppointment => eachAppointment.isStared === true,
        )
      : appointmentList

    console.log(filteredList)
    return (
      <div className="bg">
        <div className="topBox">
          <div className="AppointmentContainer">
            <form className="formContainer" onSubmit={this.addAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label className="subHeadings" htmlFor="title">
                Title
              </label>
              <input
                className="subInput"
                onChange={this.addTitle}
                type="text"
                id="title"
                placeholder="Title"
                value={title}
              />
              <label className="subHeadings" htmlFor="date">
                Date
              </label>
              <input
                className="subInput"
                onChange={this.addDate}
                type="date"
                id="date"
                placeholder="dd/mm/yyyy"
              />
              <button className="submitBtn" type="submit">
                Add
              </button>
            </form>
            <div className="imgContainer">
              <img
                className="imgMain"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointment"
              />
            </div>
          </div>
          <hr className="hrLine" />
          <div className="btmContainer">
            <h1 className="subBtmHeading">Appointments</h1>
            <button
              className="staredBtn"
              type="button"
              onClick={this.starFiltered}
            >
              Starred
            </button>
          </div>
          <ul className="ulContainer">
            {filteredList.map(eachAppointment => (
              <AppointmentItem
                details={eachAppointment}
                key={eachAppointment.id}
                stared={this.changeStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
