import axios from 'axios'
import React, { useState } from 'react'
import * as yup from 'yup'


const schema = yup.object().shape({
  email: yup
  .string()
  .email('Ouch: email must be a valid email')
  .required('Ouch: email is required')
  .notOneOf(['foo@bar.baz'], 'foo@bar.baz failure #71' )
})

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialX = 2
const initialY = 2
const URL = 'http://localhost:9000/api/result'


export default function AppFunctional(props) {

  const [x, setX ] = useState(initialX);
  const [y, setY ] = useState(initialY);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => post())
      .catch(err => alert(err.errors[0]))
  }
  

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    return (`${x},${y}`)
   
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setX(initialX);
    setY(initialY);
    setSteps(initialSteps);
    setIndex(initialIndex);
    setEmail(initialEmail);
  }

  function getNextIndex(direction) {
    if(direction === 'up'){
      if((y-1) < 0){
        return index
      }
      setY(y-1)
      setIndex(index-3)
      setSteps(steps +1)
    }
    if(direction === 'down'){
      if((y+1) > 3){
        return index
      }
      setY(y+1)
      setIndex(index+3)
      setSteps(steps +1)
    }
    if(direction === 'left'){
      if((x-1) < 1){
        return index
      }
      setX(x-1)
      setIndex(index-1)
      setSteps(steps +1)
    }
    if(direction === 'right'){
      if((x+1) > 3){
        return index
      }
      setX(x+1)
      setIndex(index+1)
      setSteps(steps +1)
    }
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    
   setEmail(evt)
  }

  function onSubmit(evt) {
    evt.preventDefault()
    validate('email', email)
    
    
   
  }

  function post () {
    const dataSet = {
      "x": x,
      "y": y,
      "steps": steps,
      "email": email
    }
   
    axios.post(URL, dataSet)
    .then(({data}) => {setMessage(data.message)})
    .finally(reset())
  } 

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={(e) => getNextIndex(e.target.id)}>LEFT</button>
        <button id="up" onClick={(e) => getNextIndex(e.target.id)}>UP</button>
        <button id="right" onClick={(e) => getNextIndex(e.target.id)}>RIGHT</button>
        <button id="down" onClick={(e) => getNextIndex(e.target.id)}>DOWN</button>
        <button id="reset" onClick={(e) => reset()}>reset</button>
      </div>
      <form onSubmit={(e) => onSubmit(e)} >
        <input id="email" type="email" value={email} onChange={(e) => onChange(e.target.value)} placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
