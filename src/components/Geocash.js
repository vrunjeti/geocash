import React from 'react'
import { render } from 'react-dom'

export default class Geocash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {location: {}}
    this.setDummyLocation = this.setDummyLocation.bind(this)
    this.setToCurrentLocation = this.setToCurrentLocation.bind(this)
    this.openModal = this.openModal.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      const loc = {
        lat: location.coords.latitude,
        lon: location.coords.longitude
      }
      this.setState({location: loc})
      localStorage.setItem('currLocation', JSON.stringify(loc))
    })

    // jQuery loads after component renders... so gg setTimeout...
    setTimeout(function() {
      $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200 // Transition out duration
      })
    }, 500)

  }

  setDummyLocation(location) {
    this.setState({
      location: dummies[location],
      locationName: location
    })
  }

  setToCurrentLocation() {
    this.setState({
      location: localStorage.currLocation,
      locationName: 'Current Location'
    })
  }

  openModal() {

  }

  addNote() {

  }

  render() {
    const { locationName, location } = this.state
    const { lat, lon } = location

    return (
      <section>
        <h5>You Are In: {locationName || 'Current Location'}</h5>
        <Dummies setDummyLocation={this.setDummyLocation} setToCurrentLocation={this.setToCurrentLocation}/>
        <Notes />
        <button
          data-target="add-note-modal"
          className="modal-trigger fab btn-floating btn-large waves-effect waves-light red">
          <i className="fa fa-plus"></i>
        </button>
        <Modal />
      </section>
    )
  }
}

const Modal = () => {
  return (
    <div id="add-note-modal" className="modal">
      <div className="modal-content">
        <h4>Add A New Note</h4>
        <input placeholder="Title" id="first_name" type="text" />
        <div className="input-field col s12">
          <textarea id="textarea-note" className="materialize-textarea"></textarea>
          <label htmlFor="textarea-note">Enter Note</label>
        </div>
      </div>
      <div className="modal-footer">
        <button className=" modal-action modal-close waves-effect waves-green btn-flat">Submit</button>
      </div>
    </div>
  )
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

const Notes = () => {
  return(
    <section>
      <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header">First</div>
          <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
        <li>
          <div className="collapsible-header">Second</div>
          <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
        <li>
          <div className="collapsible-header">Third</div>
          <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
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
