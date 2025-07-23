import React from "react";

const Rank = ({ userName, rank }) => (
  <div>
    <div className="white f3 center">
      {`${userName}, your current score is:`}
    </div>
    <div className="white f1 center">
      {rank}
    </div>
  </div>
);

export default Rank;

// import React from "react";

// const Rank = ({userName,rank}) => {
//   return (
//     <div>
//       <div className="white f3 center">
//         {`${userName} is currently ranked...`}
//       </div>
//       <div className="white f1">
//         {rank}
//       </div>
//     </div>
//   );
// }
// export default Rank;