"use client";
import React, { forwardRef } from "react";
import Keycap from "./Keycap/Keycap";
import "./Keyboard.scss";

interface KeyboardProps {
  // You don't need any props for this component
}

const Keyboard = forwardRef<HTMLDivElement, KeyboardProps>((_, ref) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="full-keyboard" ref={ref}>
      <div className="key-row1">
        {row1.map((letter, index) => (
          <Keycap key={index} letter={letter} />
        ))}
      </div>
      <div className="key-row2">
        {row2.map((letter, index) => (
          <Keycap key={index} letter={letter} />
        ))}
      </div>
      <div className="key-row3">
        {row3.map((letter, index) => (
          <Keycap key={index} letter={letter} />
        ))}
      </div>
    </div>
  );
});

export default Keyboard;
// "use client";
// import React, { forwardRef } from "react";
// import Keycap from "./Keycap/Keycap";
// import "./Keyboard.scss";

// export default function Keyboard() {
//   const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
//   const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
//   const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

//   return (
//     <div className="full-keyboard">
//       <div className="key-row1">
//         {row1.map((letter, index) => (
//           <Keycap key={index} letter={letter} />
//         ))}
//       </div>
//       <div className="key-row2">
//         {row2.map((letter, index) => (
//           <Keycap key={index} letter={letter} />
//         ))}
//       </div>
//       <div className="key-row3">
//         {row3.map((letter, index) => (
//           <Keycap key={index} letter={letter} />
//         ))}
//       </div>
//     </div>
//   );
// }
