import React, { useState } from 'react'

export default function TextForm(props) {

  let handleUpClick = () => {
    // console.log('upper case was click' + text);
    let newText = text.toUpperCase();
    setText(newText)
    props.showAlert('Converted to upperCase' , 'success')
  }

  let handleOnChange = (event) => {
    // console.log('on chnage')
    setText(event.target.value);
  }

  let handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText)
    props.showAlert('Converted to lowerCase' , 'success')
  }


  const [text, setText] = useState('')
  // text = 'new text' wrong way to change the state 
  // setText('new text'); Correct way to change the state

  return (
    <>
      <div className='container' style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#211410' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} 
            id="myBox" rows="8"></textarea>
        </div>
        <button className='btn btn-primary mx-2' onClick={handleUpClick}>Convert Uppercase</button>
        <button className='btn btn-danger mx-2' onClick={handleLoClick}>Convert Lowercase</button>

      </div>

      <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h2>Your text summary</h2>
        <p>  {text.split(' ').length} words and {text.length} characters</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:'Enter somthing in the text box above to preview it'}</p>
      </div>

    </>
  )
}
