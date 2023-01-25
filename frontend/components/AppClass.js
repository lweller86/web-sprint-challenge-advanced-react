import axios from 'axios'
import e from 'cors'
import React from 'react'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Ouch: email must be a valid email')
    .required('Ouch: email is required')
    .notOneOf(['foo@bar.baz'], 'foo@bar.baz failure #71')
})

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialX = 2
const initialY = 2
const URL = 'http://localhost:9000/api/result'


const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}


export default class AppClass extends React.Component {
  constructor() {
    super()
    this.state = {
      x: initialX,
      y: initialY,
      steps: initialSteps,
      index: initialIndex,
      message: initialMessage,
      email: '',
    }
  }

  getXY = () => {
    return (`${this.state.x},${this.state.y}`)
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    setX(initialX);
    setY(initialY);
    setSteps(initialSteps);
    setIndex(initialIndex);
    setEmail(initialEmail);
  }

  getNextIndex = (direction) => {
    if (direction === 'up') {
      if ((this.state.y - 1) === 0) {
        return ({ x: this.state.x, y: this.state.y, index: this.state.index })
      }
      return ({
        x: this.state.x,
        y: this.state.y - 1,
        index: this.state.index - 3,
        steps: this.state.steps + 1,
      })
    }

    if (direction === 'down') {
      if ((this.state.y + 1) === 4) {
        return ({ x: this.state.x, y: this.state.y, index: this.state.index  })
      }
      return ({
        x: this.state.x,
        y: this.state.y + 1,
        index: this.state.index + 3,
        steps: this.state.steps + 1,

      })
    }

    if (direction === 'left') {
      if ((this.state.x - 1) === 0 ) {
        return ({ x: this.state.x, y: this.state.y, index: this.state.index  })
      }
      return ({
        x: this.state.x - 1,
        y: this.state.y,
        index: this.state.index - 1,
        steps: this.state.steps + 1,

      })
    }
    if (direction === 'right') {
      if (this.state.x + 1 === 4) {
        return ({ x: this.state.x, y: this.state.y, index: this.state.index  })
      }
      return ({
        x: this.state.x + 1,
        y: this.state.y,
        index: this.state.index + 1,
        steps: this.state.steps + 1,

      })
    }
  }

  move = (evt) => {
    let nextMove = this.getNextIndex(evt.target.id)
    if ((`${nextMove.x},${nextMove.y}`) === this.state.index) {
      return this.setState({ message: `You can't go ${evt.target.id}` })
    }
    this.setState({
      ...this.state,
      message: initialMessage,
      x: nextMove.x,
      y: nextMove.y,
      steps: nextMove.steps,
      index: nextMove.index,
    })
  }

  onChange = (evt) => {
    console.log(evt.target.value)
    this.setState({
      ...this.state,
      email: evt.target.value
    });

  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onChange
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x},{this.state.y})</h3>
          <h3 id="steps">You moved {this.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={(e) => this.move(e)} >LEFT</button>
          <button id="up" onClick={(e) => this.move(e)} >UP</button>
          <button id="right" onClick={(e) => this.move(e)} >RIGHT</button>
          <button id="down" onClick={(e) => this.move(e)} >DOWN</button>
          <button id="reset" onClick={(e) => this.reset()} >reset</button>
        </div>
        <form>
          <input id="email" type="email" onChange={this.handleChange} placeholder="type email"></input>
          <input onSubmit={this.onSubmit} id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
