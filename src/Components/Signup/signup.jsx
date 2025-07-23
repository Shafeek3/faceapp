import React, { useState } from "react";
import "./signup.css";

const Signup = ({ handleSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    // Call the signup function passed from App
    handleSignup(name, email, password);
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={onSubmitSignup}>
          <fieldset id="signup" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign Up</legend>

            <div className="mt3">
              <label className="db fw6 lh-copy f6">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt3">
              <label className="db fw6 lh-copy f6">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mv3">
              <label className="db fw6 lh-copy f6">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>

          <div>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Signup;




// import React, { useState } from "react";
// import "./signup.css";

// const Signup = ({ onRouteChange, setUser,handleSignup }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmitSignup = (e) => {
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

//     // Save user for later login
//     localStorage.setItem("smartbrainUser", JSON.stringify(newUser));

//     setUser(newUser);
//     onRouteChange("home"); // Go to main app
//      handleSignup(name, email, password);
//   };

//   return (
//     <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
//       <main className="pa4 black-80">
//         <form className="measure" onSubmit={onSubmitSignup}>
//           <fieldset id="signup" className="ba b--transparent ph0 mh0">
//             <legend className="f2 fw6 ph0 mh0">Sign Up</legend>

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
//               value="Sign Up"
//             />
//           </div>
//         </form>
//       </main>
//     </article>
//   );
// };

// export default Signup;
