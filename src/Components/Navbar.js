// Importing links as we have some links so we need to use ``Link`` instead of ``a``
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  // State for managing the opacity of the link element for adding a note
  const [touched,setTouched] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <div className="links flex mt-4 ml-6 sm:mt-20 sm:ml-20 mb-10">
          <Link
            to="/"
            className="navbar-link text-4xl font-semibold text-gray-500"
          >
            <h1>Magic Notes</h1>
          </Link>
          {/* <input type="text" className="bg-white rounded h-5 m-1 shadow-lg ring-white focus:bg-gray-50 outline-none p-5 font-medium text-gray-700" /> */}
          <Link to="/create" className="create-new-note navbar-link" style={{ opacity: touched ? 0.2 : 1, transition: 'opacity 100ms ease' }} onMouseDown={() => setTouched(true)}
            onMouseUp={() => setTouched(false)}>
            <svg
              className="w-12 bg-pink-500 p-2 rounded ml-10 shadow-xl ring-white"
              version="1.0"
              viewBox="0 0 1280.000000 1280.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                fill="#ffffff"
                stroke="none"
              >
                <path
                  d="M5740 12784 c-199 -42 -369 -198 -438 -399 l-27 -80 -3 -2387 -2
-2388 -2356 0 c-2619 0 -2435 5 -2584 -68 -104 -50 -212 -158 -263 -263 -66
-134 -67 -146 -67 -799 0 -651 2 -666 66 -795 69 -141 187 -243 344 -299 l85
-31 2387 -3 2388 -2 2 -2388 3 -2387 28 -80 c73 -206 239 -357 443 -400 101
-21 1207 -21 1308 0 204 43 370 194 443 400 l28 80 3 2387 2 2388 2388 2 2387
3 85 31 c157 56 275 158 344 299 64 129 66 144 66 795 0 653 -1 665 -67 799
-51 105 -159 213 -263 263 -149 73 35 68 -2584 68 l-2356 0 -2 2388 -3 2387
-27 80 c-70 203 -240 357 -443 400 -100 21 -1217 20 -1315 -1z"
                />
              </g>
            </svg>
          </Link>
        </div>
      </nav>
    </div>
  );
}
