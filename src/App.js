import React, { useState, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import ImageBar from "./Components/ImageBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./Components/Signin";

const USER_ID = "auleen";

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = "3a221606b13346e691076a43ec20ccb3";
const APP_ID = "18fe599ac2d44347be84af2d21baed7b";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";

function App() {
  const [url, setUrl] = useState("");
  const [box, setBox] = useState({});
  //setting up the states

  //setting up the api auth
  const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg";
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: url,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  //change url state
  const changeurl = (newurl) => {
    setUrl(newurl);
    console.log("NewURL", url);
  };

  //function to calculate the face box
  const calculateFaceLocation = (data) => {
    // console.log("Called Function", data)
    console.log(typeof data);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  //fetch api on button click
  const onbuttonclick = () => {
    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => calculateFaceLocation(JSON.parse(result)))
      .then((boxresult) => setBox(boxresult))
      .catch((error) => console.log("error", error));
  };
  //render app
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index exact path="/" element={<SignInSide />} />
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <SearchBar
                  oninput={changeurl}
                  stateurl={url}
                  buttonclick={onbuttonclick}
                />
                <ImageBar imgurl={url} box={box} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
