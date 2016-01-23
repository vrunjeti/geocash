import React from 'react'
import { render } from 'react-dom'

export default class Geocash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {position: {}}
    this.setDummyLocation = this.setDummyLocation.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ position: {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }})
    })
  }

  setDummyLocation(location) {
    this.setState({position: dummies[location]})
  }

  render() {
    const { lat, lon } = this.state.position

    return (
      <div>
        <h5>Current location: {lat}, {lon}</h5>
        <Dummies setDummyLocation={this.setDummyLocation} />
      </div>
    )
  }
}

const Dummies = ({ setDummyLocation }) => {
  const margin = { margin: '0 5px 0' }
  const dummyLocations = Object.keys(dummies)

  return (
    <div className="valign-wrapper">
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
    </div>
  )
}

const dummies = {
  'NYC'      : {lat: 40.757975, lon: -73.979607},
  'SF'       : {lat: 37.819456, lon: -122.478184},
  'Singapore': {lat: 1.283453, lon: 103.864936},
  'Hong Kong': {lat: 22.294269, lon: 114.172528},
  'Hyderabad': {lat: 17.431233, lon: 78.475053}
}