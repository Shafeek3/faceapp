import React from "react";
import "./navigation.css";
import "tachyons";

const Navigation = ({ onRouteChange }) => (
  <nav className="navigation flex justify-end">
    <p
      onClick={() => onRouteChange("signin")}
      className="f3 link dim black pa3 pointer"
    >
      Sign Out
    </p>
  </nav>
);

export default Navigation;

// import React from "react";
// import "./navigation.css";
// import "tachyons";

// const Navigation = ({ onRouteChange }) => {
//   return (
//     <nav className="navigation"
      
//     >
//       <p
//         onClick={() => onRouteChange("signin")} 
         
//         className="f3 link dim black pa3 underline pointer"
//       >
//         Sign Out
//       </p>
//     </nav>
//   );
// };

// export default Navigation;
