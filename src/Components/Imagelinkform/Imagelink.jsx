import React from "react";
import "./imagelink.css";

const Imagelink = ({ onButtonSubmit, onInputchange, input }) => (
  <div>
    <p className="custom-heading f3 fw7 tc gradient-text">
      This Man Can Detect Your Face!
    </p>
    <div className="center">
      <div className="form center pa4 br3 shadow-5 flex">
        <input
          className="f4 pa2 flex-auto"
          type="text"
          placeholder="Enter image URL"
          onChange={onInputchange}
          value={input}
          aria-label="Image URL"
        />
        <button
          className="grow f4 link ph3 pv2 dib white bg-light-purple ml2"
          onClick={onButtonSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  </div>
);

export default Imagelink;

// import React from "react";
// import './imagelink.css';


// const Imagelink = ({onButtonSubmit,onInpiutchange,input}) => {
//   return (
//     <div>
//       <p className="custom-heading f3  fw7 tc gradient-text">
//         {'This Magic Man will detect faces in your pictures. Give it a try!'}
//       </p>
//       <div className="center">
//         <div className="form center pa4 br3 shadow-5 flex">
//           <input className="f4 pa2 " type="text" placeholder="Enter image url" onChange={onInpiutchange} value={input}/>
//           <button className="  grow f4 link ph3 pv2 dib white bg-light-purple ml2" onClick={onButtonSubmit}>
//             Detect
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Imagelink;