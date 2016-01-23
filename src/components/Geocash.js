import React from 'react'
import { render } from 'react-dom'

export default class Geocash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {location: {}}
    this.setDummyLocation = this.setDummyLocation.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({ location: {
        lat: location.coords.latitude,
        lon: location.coords.longitude
      }})
    })
    // document.getElementsByClassName('collapsible').collapsible({accordion: true})
  }

  setDummyLocation(location) {
    this.setState({location: dummies[location]})
  }

  getLocationFromCoords(coords) {
    return Object.keys(dummies)
      .find(city => dummies[city].lat === coords.lat && dummies[city].lon === coords.lon)
  }

  render() {
    const { lat, lon } = this.state.location
    const currLocation = this.getLocationFromCoords(this.state.location) || `${lat}, ${lon}`

    return (
      <section>
        <h5>Current location: {currLocation}</h5>
        <Dummies setDummyLocation={this.setDummyLocation} />
        <Notes />
      </section>
    )
  }
}

const Dummies = ({ setDummyLocation }) => {
  const margin = { margin: '0 5px 0' }
  const dummyLocations = Object.keys(dummies)

  return (
    <section className="valign-wrapper">
      <span className="valign" style={margin}>Set Dummy Location:</span>
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