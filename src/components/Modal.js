import React from 'react'
import { render } from 'react-dom'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.addNote = this.addNote.bind(this)
  }

  handleChange(formElement, event) {
    this.setState({
      [formElement]: event.target.value
    })
  }

  addNote() {
    let { notes } = this.props
    const { location, getNotes } = this.props
    const { title, note } = this.state

    notes.push({
      title: title,
      note: note,
      location: location
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    this.setState({
      title: '',
      note: ''
    })
    getNotes()
  }

  render() {
    return (
      <div id="add-note-modal" className="modal">
        <div className="modal-content">
          <h4>Add A New Note</h4>
          <input placeholder="Title" type="text" onChange={this.handleChange.bind(this, 'title')}/>
          <div className="input-field col s12">
            <textarea
              id="textarea-note"
              className="materialize-textarea"
              onChange={this.handleChange.bind(this, 'note')}>
            </textarea>
            <label htmlFor="textarea-note">Enter Note</label>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={this.addNote} className="modal-action modal-close waves-effect waves-green btn-flat">Submit</button>
        </div>
      </div>
    )
  }
}
