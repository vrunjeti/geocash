import React from 'react'
import { render } from 'react-dom'
import Modal from './Modal'

export default class Geocash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {},
      notes: []
    }
    this.setDummyLocation = this.setDummyLocation.bind(this)
    this.setToCurrentLocation = this.setToCurrentLocation.bind(this)
    this.getNotes = this.getNotes.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      const loc = {
        lat: location.coords.latitude,
        lon: location.coords.longitude
      }
      this.setState({location: loc})
      localStorage.setItem('currLocation', JSON.stringify(loc))
      this.getNotes()
    })

    // jQuery loads after component renders... so gg setTimeout...
    setTimeout(function() {
      $('.modal-trigger').leanModal({
        dismissible: true,
        opacity: .5
      })
      $('.collapsible').collapsible({
        accordion : true
      })
    }, 500)

  }

  setDummyLocation(location) {
    this.setState({
      location: dummies[location],
      locationName: location
    }, this.getNotesWithinDistance.bind(this, 1))
  }

  setToCurrentLocation() {
    this.setState({
      location: JSON.parse(localStorage.currLocation),
      locationName: 'Current Location'
    }, this.getNotesWithinDistance.bind(this, 1))
  }

  getNotes() {
    let notes = localStorage['notes']
    // console.log('notezzzz', notes)
    notes = notes ? JSON.parse(notes) : []
    // console.log('notesssss', notes)
    this.setState({notes: notes}, this.getNotesWithinDistance.bind(this, 1))

  }

  distance(coords1, coords2) {
    const R = 6371
    return Math.acos(Math.sin(coords1.lat)*Math.sin(coords2.lat) +
      Math.cos(coords1.lat)*Math.cos(coords2.lat) *
      Math.cos(coords2.lon - coords1.lon)) * R
  }

  getNotesWithinDistance(dist) {
    // console.log('hi')
    const { notes, location } = this.state

    console.log('location', location)
    console.log('notes', notes)

    const notesWithinDistance = notes.filter(note => {
      console.log(location, note.location)
      return this.distance(location, note.location) <= dist
    })
    console.log('meep', notesWithinDistance)

    this.setState({
      notesWithinDistance: notesWithinDistance
    })
  }

  render() {
    const { locationName, location, notes, notesWithinDistance } = this.state
    const { lat, lon } = location

    // console.log('notesWithinDistance', notesWithinDistance)

    return (
      <section>
        <h5>You Are In: {locationName || 'Current Location'}</h5>
        <Dummies setDummyLocation={this.setDummyLocation} setToCurrentLocation={this.setToCurrentLocation}/>
        {notesWithinDistance && <Notes notes={notesWithinDistance}/>}
        <button
          data-target="add-note-modal"
          className="modal-trigger fab btn-floating btn-large waves-effect waves-light red">
          <i className="fa fa-plus"></i>
        </button>
        <Modal notes={notes} location={location} getNotes={this.getNotes}/>
      </section>
    )
  }
}

const Dummies = ({ setDummyLocation, setToCurrentLocation }) => {
  const margin = { margin: '0 5px 0' }
  const dummyLocations = Object.keys(dummies)

  return (
    <section className="valign-wrapper">
      <span className="valign" style={margin}>Teleport To:</span>
      <span
        className="valign chip"
        style={margin}
        onClick={setToCurrentLocation}>
        Current Location
      </span>
      {
        dummyLocations.map((loc, i) => {
          return (
            <span
              className="valign chip"
              style={margin}
              onClick={setDummyLocation.bind(this, loc)}
              key={loc + i}>
              {loc}
            </span>
          )
        })
      }
    </section>
  )
}

const Notes = ({ notes }) => {
  return(
    <section>
      <ul className="collapsible" data-collapsible="accordion">
        {
          notes.map((note, i) => {
            return (
              <li key={note.title + note.note + i}>
                <div className="collapsible-header">{note.title}</div>
                <div className="collapsible-body"><p>{note.note}</p></div>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}

const dummies = {
  'NYC'      : {lat: 40.757975, lon: -73.979607},
  'SF'       : {lat: 37.819456, lon: -122.478184},
  'Singapore': {lat: 1.283453, lon: 103.864936},
  'Hong Kong': {lat: 22.294269, lon: 114.172528},
  'Hyderabad': {lat: 17.431233, lon: 78.475053}
}
