// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { api } from "../../api/client.js";
// import { withFallback } from "../../api/withFallback.js";
// import { mockFinancing } from "../../mockData.js";

// // Small circular Cherry mark: a dark disc with a "%" made from two dots and
// // a diagonal slash, echoing the real Cherry logo without reproducing it
// // pixel-for-pixel as an image asset.
// function CherryMark({ className = "" }) {
//   return (
//     <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
//       <circle cx="20" cy="20" r="20" fill="currentColor" />
//       <line x1="13" y1="27" x2="27" y2="13" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
//       <circle cx="14.5" cy="14.5" r="3.2" fill="white" />
//       <circle cx="25.5" cy="25.5" r="3.2" fill="white" />
//     </svg>
//   );
// }

// /** Sitewide announcement strip for the Cherry financing partnership.
//  * Lives above the sticky header (not part of it) so it scrolls away once
//  * the visitor starts reading, instead of permanently eating into the
//  * nav's height. Pulls the live "primary" financing option so the tagline
//  * stays in sync with whatever the backend/mock marks as primary. */
// export default function CherryBar() {
//   const [financing, setFinancing] = useState([]);

//   useEffect(() => {
//     withFallback(() => api.get("/financing/options/"), mockFinancing).then((data) =>
//       setFinancing(data.length ? data : mockFinancing)
//     );
//   }, []);

//   const cherry = financing.find((f) => f.kind === "cherry") || financing.find((f) => f.is_primary);
//   if (!cherry) return null;

//   return (
//     <motion.div
//       initial={{ y: -24, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//       className="bg-ink text-white"
//     >
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2 flex items-center justify-center gap-3 text-center flex-wrap">
//         <CherryMark className="w-6 h-6 text-white shrink-0" />
//         <p className="text-[13px] leading-tight">
//           <span className="font-display font-semibold mr-1.5">{cherry.display_name}</span>
//           <span className="text-white/70">{cherry.tagline}</span>
//         </p>
//         <Link
//           to="/financing"
//           className="text-[12.5px] font-semibold text-breath hover:text-breath/80 underline underline-offset-2 shrink-0 transition-colors"
//         >
//           Learn More
//         </Link>
//       </div>
//     </motion.div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../api/client.js";
import { withFallback } from "../../api/withFallback.js";
import { mockFinancing } from "../../mockData.js";

// Cherry logo mark, pulled from the public images folder.
function CherryMark({ className = "" }) {
  return (
    <img
      src="/images/Cherry_logo.jpg"
      alt="Cherry"
      className={`${className} rounded-full object-cover`}
    />
  );
}

/** Sitewide announcement strip for the Cherry financing partnership.
 * Lives above the sticky header (not part of it) so it scrolls away once
 * the visitor starts reading, instead of permanently eating into the
 * nav's height. Pulls the live "primary" financing option so the tagline
 * stays in sync with whatever the backend/mock marks as primary. */
export default function CherryBar() {
  const [financing, setFinancing] = useState([]);

  useEffect(() => {
    withFallback(() => api.get("/financing/options/"), mockFinancing).then((data) =>
      setFinancing(data.length ? data : mockFinancing)
    );
  }, []);

  const cherry = financing.find((f) => f.kind === "cherry") || financing.find((f) => f.is_primary);
  if (!cherry) return null;

  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-ink text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2 flex items-center justify-center gap-3 text-center flex-wrap">
        <CherryMark className="w-6 h-6 text-white shrink-0" />
        <p className="text-[13px] leading-tight">
          <span className="font-display font-semibold mr-1.5">{cherry.display_name}</span>
          <span className="text-white/70">{cherry.tagline}</span>
        </p>
        <Link
          to="/financing"
          className="text-[12.5px] font-semibold text-breath hover:text-breath/80 underline underline-offset-2 shrink-0 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}