import React from 'react';
import "./ImageBar.css"
import image from "C:/Users/aulee/OneDrive/Pictures/car1.png"
function ImageBar(props) {
    // console.log({});
    return ( 
    <div className="bar">

        <div className="inputimg">
        <img id="inputimage" src={props.imgurl}></img>
        <div className='info'>Input Image</div>
        </div>
        <div className='inputimg'>
        <img id="inputimage" src={props.imgurl}></img>
        <div className='bounding-box' style={{top: props.box.topRow, right: props.box.rightCol, bottom: props.box.bottomRow, left: props.box.leftCol}}></div>
        <div className='info'>Detected Face</div>
        </div>

    </div> 
    );
}

export default ImageBar;