// App.jsx
import React, { useState } from "react";
import Navigation from "./Components/Navigation/navigation.jsx";
import Logo from "./Components/Logo/logo.jsx";
import Imagelink from "./Components/Imagelinkform/Imagelink.jsx";
import Rank from "./Components/Rank/rank.jsx";
import Facerecognition from "./Components/Facerecognition/facerecognitio.jsx";
import ParticlesBg from "./ParticlesBg.jsx";
import Signin from "./Components/Signin/Signin.jsx";
import Signup from "./Components/Signup/signup.jsx";

import "./App.css";
import "tachyons";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [userName, setUserName] = useState("");
  const [rank, setRank] = useState(0);
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState(null);

  const backendURL = "https://faceapp-backend-a7ve.onrender.com";


  const routeToHome = (userData) => {
    setUser(userData);
    setUserName(userData.name);
    setRank(userData.entries);
    setRoute("home");
  };

  const handleSignin = (email, password) => {
    fetch(`${backendURL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) routeToHome(data.user);
        else alert(data.error);
      })
      .catch((err) => console.error("Signin failed", err));
  };

  const handleSignup = (name, email, password) => {
    fetch(`${backendURL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) routeToHome(data.user);
        else alert(data.error);
      })
      .catch((err) => console.error("Signup failed", err));
  };

  const calculateFaceBoxes = (regions) => {
    const img = document.getElementById("inputimage");
    if (!img) return [];
    const width = img.width;
    const height = img.height;

    return regions.map((r) => {
      const b = r.region_info.bounding_box;
      return {
        left: b.left_col * width,
        top: b.top_row * height,
        width: (b.right_col - b.left_col) * width,
        height: (b.bottom_row - b.top_row) * height,
      };
    });
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    setBoxes([]); // clear old boxes

    const detectFace = async () => {
      try {
        // 1️⃣ Call backend Clarifai proxy instead of Clarifai directly
        const clarifaiRes = await fetch(`${backendURL}/clarifai`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: input }),
        });

        const clarifaiData = await clarifaiRes.json();
        console.log("Clarifai Response:", clarifaiData);

        const regions = clarifaiData.outputs?.[0]?.data?.regions || [];
        console.log("Detected Regions:", regions);

        // 2️⃣ Wait for image to fully load before calculating pixel boxes
        await new Promise((resolve) => {
          const img = document.getElementById("inputimage");
          if (img && img.complete) return resolve();
          if (img) img.onload = () => resolve();
        });

        // 3️⃣ Convert relative bounding boxes to pixel values
        const pixelBoxes = calculateFaceBoxes(regions);
        setBoxes(pixelBoxes);

        // 4️⃣ If faces detected & user logged in → update rank
        if (regions.length > 0 && user) {
          const updateRes = await fetch(`${backendURL}/image`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.id }),
          });
          const entriesData = await updateRes.json();
          setRank(entriesData.entries);
        }
      } catch (err) {
        console.error("Face detection or rank update failed:", err);
      }
    };

    detectFace();
    setInput("");
  };

  const onRouteChange = (newRoute) => {
    if (newRoute === "signin") {
      setUser(null);
      setUserName("");
      setRank(0);
      setBoxes([]);
      setImageUrl("");
      setInput("");
    }
    setRoute(newRoute);
  };

  return (
    <div className="App">
      <ParticlesBg />
      <div className="wrapper">
        {route === "signin" && (
          <Signin handleSignin={handleSignin} onRouteChange={onRouteChange} />
        )}
        {route === "signup" && (
          <Signup handleSignup={handleSignup} onRouteChange={onRouteChange} />
        )}
        {route === "home" && user && (
          <>
            <Navigation onRouteChange={onRouteChange} />
            <Logo />
            <Rank userName={userName} rank={rank} />
            <Imagelink
              input={input}
              onInputchange={(e) => setInput(e.target.value)}
              onButtonSubmit={onButtonSubmit}
            />
            <Facerecognition imageUrl={imageUrl} boxes={boxes} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;





// // App.jsx
// import React, { useState } from "react";
// import Navigation from "./Components/Navigation/navigation.jsx";
// import Logo from "./Components/Logo/logo.jsx";
// import Imagelink from "./Components/Imagelinkform/Imagelink.jsx";
// import Rank from "./Components/Rank/rank.jsx";
// import Facerecognition from "./Components/Facerecognition/facerecognitio.jsx";
// import ParticlesBg from "./ParticlesBg.jsx";
// import Signin from "./Components/Signin/Signin.jsx";
// import Signup from "./Components/Signup/signup.jsx";

// import "./App.css";
// import "tachyons";

// function App() {
//   const [input, setInput] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [boxes, setBoxes] = useState([]);
//   const [userName, setUserName] = useState("");
//   const [rank, setRank] = useState(0);
//   const [route, setRoute] = useState("signin");
//   const [user, setUser] = useState(null);

//   // const PAT = "839878715d9a46edb14d0f74bc42078e";
//   // const USER_ID = "5128c1h7sosh";
//   // const APP_ID = "faceapp";
//   // const MODEL_ID = "face-detection";
//   // const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

//   const routeToHome = (userData) => {
//     setUser(userData);
//     setUserName(userData.name);
//     setRank(userData.entries);
//     setRoute("home");
//   };

//   const handleSignin = (email, password) => {
//     fetch("http://localhost:3000/signin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.user) routeToHome(data.user);
//         else alert(data.error);
//       })
//       .catch(err => console.error("Signin failed", err));
//   };

//   const handleSignup = (name, email, password) => {
//     fetch("http://localhost:3000/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password })
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.user) routeToHome(data.user);
//         else alert(data.error);
//       })
//       .catch(err => console.error("Signup failed", err));
//   };

//  const calculateFaceBoxes = (regions) => {
//   const img = document.getElementById("inputimage");
//   if (!img) return [];
//   const width = img.width;
//   const height = img.height;

//   return regions.map(r => {
//     const b = r.region_info.bounding_box;
//     return {
//       left: b.left_col * width,
//       top: b.top_row * height,
//       width: (b.right_col - b.left_col) * width,
//       height: (b.bottom_row - b.top_row) * height
//     };
//   });
// };

//  const onButtonSubmit = () => {
//   setImageUrl(input);
//   setBoxes([]); // Clear previous boxes

//   const fetchFace = async () => {
//     try {
//       const raw = JSON.stringify({
//         user_app_id: { user_id: USER_ID, app_id: APP_ID },
//         inputs: [{ data: { image: { url: input } } }],
//       });

//       const res = await fetch(
//         `https://cors-anywhere.herokuapp.com/https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Key ${PAT}`,
//             "Content-Type": "application/json",
//           },
//           body: raw,
//         }
//       );

//       const data = await res.json();
//       const regions = data.outputs?.[0]?.data?.regions || [];
//       console.log("Clarifai regions:", regions);

//       // Wait for the image to fully load before calculating
//       const img = await new Promise(resolve => {
//         const image = document.getElementById("inputimage");
//         if (image.complete) return resolve(image);
//         image.onload = () => resolve(image);
//       });

//       const width = img.width;
//       const height = img.height;

//       const pixelBoxes = regions.map(r => {
//         const b = r.region_info.bounding_box;
//         return {
//           top: b.top_row * height,
//           left: b.left_col * width,
//           width: (b.right_col - b.left_col) * width,
//           height: (b.bottom_row - b.top_row) * height,
//         };
//       });

//       console.log("Pixel boxes:", pixelBoxes);
//       setBoxes(pixelBoxes);

//       if (regions.length > 0 && user) {
//         const updateRes = await fetch("http://localhost:3000/image", {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ id: user.id }),
//         });
//         const entriesData = await updateRes.json();
//         setRank(entriesData.entries);
//       }

//     } catch (err) {
//       console.error("Error in face detection or entry update:", err);
//     }
//   };

//   fetchFace();
//   setInput("");
// };


//   const onRouteChange = (newRoute) => {
//     if (newRoute === "signin") {
//       setUser(null);
//       setUserName("");
//       setRank(0);
//       setBoxes([]);
//       setImageUrl("");
//       setInput("");
//     }
//     setRoute(newRoute);
//   };

//   return (
//     <div className="App">
//       <ParticlesBg />
//       <div className="wrapper">
//         {route === "signin" && (
//           <Signin handleSignin={handleSignin} onRouteChange={onRouteChange} />
//         )}
//         {route === "signup" && (
//           <Signup handleSignup={handleSignup} onRouteChange={onRouteChange} />
//         )}
//         {route === "home" && user && (
//           <>
//             <Navigation onRouteChange={onRouteChange} />
//             <Logo />
//             <Rank userName={userName} rank={rank} />
//             <Imagelink
//               input={input}
//               onInputchange={e => setInput(e.target.value)}
//               onButtonSubmit={onButtonSubmit}
//             />
//             <Facerecognition imageUrl={imageUrl} boxes={boxes} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
