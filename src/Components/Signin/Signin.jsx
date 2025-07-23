import React, { useState } from "react";
import "./Signin.css";

const Signin = ({ handleSignin, onRouteChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitSignin = (e) => {
    e.preventDefault(); // Prevent form reload
    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }
    handleSignin(email, password);
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={onSubmitSignin}>
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>

            {/* Email */}
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mv3">
              <label className="db fw6 lh-copy f6">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Submit */}
            <div>
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign In"
              />
            </div>
            <p className="f6 center mt3">
              Don't have an account?{" "}
              <span
                className="link dim blue pointer"
                onClick={() => onRouteChange("signup")}
              >
                Create one
              </span>
            </p>
          </fieldset>
        </form>
      </main>
    </article>
  );
};

export default Signin;




// import React, { useState } from "react";
// import "./Signin.css";


// const Signin = ({ onRouteChange, setUser, handleSignin }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmitRegister = (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       alert("Please fill all fields!");
//       return;
//     }

//     const newUser = {
//       id: Date.now(),
//       name,
//       email,
//       rank: 0,
//     };

//     // Save in localStorage (optional for persistence)
//     localStorage.setItem("smartbrainUser", JSON.stringify(newUser));

//     setUser(newUser);        
//     onRouteChange("home");   
//     handleSignin(name, email, password);
//   };

//   return (
//     <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
//       <main className="pa4 black-80">
//         <form className="measure" onSubmit={onSubmitRegister}>
//           <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//             <legend className="f2 fw6 ph0 mh0">Sign In</legend>

//             {/* Name */}
//             <div className="mt3">
//               <label className="db fw6 lh-copy f6">Name</label>
//               <input
//                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             {/* Email */}
//             <div className="mt3">
//               <label className="db fw6 lh-copy f6">Email</label>
//               <input
//                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* Password */}
//             <div className="mv3">
//               <label className="db fw6 lh-copy f6">Password</label>
//               <input
//                 className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </fieldset>

//           {/* Submit */}
//           <div>
//             <input
//               className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
//               type="submit"
//               value="Sign In"
//             />
//             <br />
//             <br />
//              <p className="f6 center">
//                    Don't have an account?{" "}
//                 <span
//                     onClick={() => onRouteChange("signup")}
//                     className="link dim blue pointer pl2"
//                 >
//                   Create one
//                 </span>
//         </p>
//           </div>
//         </form>
//       </main>
//     </article>
//   );
// };

// export default Signin;

