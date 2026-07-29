// import React from "react";
// import { Link } from "react-router-dom";

// /**
//  * A named form entry with its real scanned preview image when we have
//  * one, and a clean "preview not available" placeholder when we don't --
//  * never a random/mismatched image. `to` links to a working digital
//  * version; when absent, the card is shown as reference-only (no fake
//  * download link).
//  */
// export default function PdfPreviewCard({ name, previewImage, to, description }) {
//   return (
//     <div className="bg-white border border-ink/10 rounded-2xl overflow-hidden flex flex-col">
//       <div className="aspect-[4/5] bg-mist/60 flex items-center justify-center overflow-hidden">
//         {previewImage ? (
//           <img src={previewImage} alt={`${name} form preview`} className="w-full h-full object-cover object-top" />
//         ) : (
//           <div className="text-center px-4">
//             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-ink/25 mx-auto mb-2">
//               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//               <path d="M14 2v6h6" />
//             </svg>
//             <p className="text-[11px] text-ink/35">Preview not available</p>
//           </div>
//         )}
//       </div>
//       <div className="p-4 flex-1 flex flex-col">
//         <p className="font-medium text-ink text-sm mb-1">{name}</p>
//         {description && <p className="text-xs text-ink/50 mb-3 flex-1">{description}</p>}
//         {to ? (
//           <Link to={to} className="mt-auto text-breath text-sm font-semibold">Fill Out Online &rarr;</Link>
//         ) : (
//           <p className="mt-auto text-xs text-ink/30 italic">Available at your visit</p>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function PdfPreviewCard({
  name,
  previewImage,
  description,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => previewImage && setOpen(true)}
        className="
          bg-white 
          border border-ink/10 
          rounded-xl 
          p-4 
          cursor-pointer
          hover:shadow-md
          transition
        "
      >

        {previewImage ? (
          <img
            src={previewImage}
            alt={name}
            className="
              w-full
              h-40
              object-cover
              rounded-lg
              mb-3
            "
          />
        ) : (
          <div
            className="
              w-full
              h-40
              rounded-lg
              bg-ink/5
              flex
              items-center
              justify-center
              text-sm
              text-ink/40
              mb-3
            "
          >
            PDF Preview
          </div>
        )}


        <h3 className="font-medium text-ink">
          {name}
        </h3>


        {description && (
          <p className="text-xs text-ink/50 mt-1">
            {description}
          </p>
        )}


        {previewImage && (
          <p className="text-xs text-breath mt-3">
            Click to view larger
          </p>
        )}

      </div>



      {/* Preview Modal */}
      {open && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
            flex
            items-center
            justify-center
            p-5
          "
          onClick={() => setOpen(false)}
        >

          <div
            className="
              bg-white
              rounded-xl
              max-w-5xl
              max-h-[90vh]
              overflow-auto
              p-5
              relative
            "
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setOpen(false)}
              className="
                absolute
                right-4
                top-3
                text-xl
                text-ink/60
                hover:text-ink
              "
            >
              ×
            </button>


            <h2 className="text-lg font-semibold mb-4">
              {name}
            </h2>


            <img
              src={previewImage}
              alt={name}
              className="
                max-w-full
                max-h-[75vh]
                object-contain
                mx-auto
              "
            />

          </div>

        </div>

      )}

    </>
  );
}