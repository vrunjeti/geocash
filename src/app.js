import React from 'react'
import { render } from 'react-dom'
import Geocash from './components/Geocash'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <body>
          <nav>
            <div className="nav-wrapper container">
              <div className="brand-logo">Geocash</div>
            </div>
          </nav>
          <div className="container">
            <Geocash />
          </div>
        </body>
      </div>
    )
  }
}
