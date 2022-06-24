import React from 'react';
import "./Search.css"
function SearchBar(props) {
  console.log({props})

  const getInputValue = (event)=>{
    // show the user input value to console
    const userValue = event.target.value;
    console.log(userValue);
    props.oninput(userValue);
    console.log("StateURl:",props.stateurl)
};
    return ( 
    <>
    <div className='textCont'><strong>Enter the URL of a image for the BigBrain to detect</strong></div>
    <div className='container'>
    
    <div className='search'>
      <input placeholder="Enter Image URL Here" className='input' onChange={getInputValue}/>
      <button className='submit' onClick={props.buttonclick}>Submit</button>
    </div>
    </div>
    </> );
}

export default SearchBar;