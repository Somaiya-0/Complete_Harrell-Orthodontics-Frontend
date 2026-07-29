import React from "react";

const MAIN_ADDRESS = "5030 US Highway 280 Suite D, Alexander City, Alabama 35010";
const SATELLITE_ADDRESS = "2520 Interstate Dr, Opelika, AL 36801";

export default function Contact() {
  function printDirections() {
    window.print();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl mb-6 text-ink">Contact</h1>

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-ink/10 rounded-2xl p-6 space-y-2 text-ink/80">
          <p className="font-display text-lg text-ink mb-2">
            Main Office — Alexander City
          </p>

          <p>{MAIN_ADDRESS}</p>

          <p>
            <strong className="text-ink">Phone:</strong>{" "}
            <a href="tel:2562346353" className="text-breath">
              256-234-6353
            </a>
          </p>

          <p>
            <strong className="text-ink">Emergency / Text:</strong>{" "}
            <a href="tel:2564962439" className="text-breath">
              256-496-2439
            </a>
          </p>

          <p>
            <strong className="text-ink">Fax:</strong> 256-329-4335
          </p>

          <p>
            <strong className="text-ink">Email:</strong>{" "}
            Jessica.drharrell@gmail.com
          </p>
        </div>

        <div className="bg-white border border-ink/10 rounded-2xl p-6 space-y-2 text-ink/80">
          <p className="font-display text-lg text-ink mb-2">
            Satellite Office — Opelika
          </p>

          <p>{SATELLITE_ADDRESS}</p>

          <p className="text-sm text-ink/50">
            Auburn/Opelika, Alabama area
          </p>
        </div>
      </div>

      <div className="bg-white border border-ink/10 rounded-2xl p-6 mb-10">
        <p className="font-display text-lg text-ink mb-3">
          Office Hours
        </p>

        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-ink/5">
              <td className="py-1.5 text-ink/70">
                Monday – Thursday
              </td>
              <td className="py-1.5 text-ink text-right">
                By Appointment
              </td>
            </tr>

            <tr className="border-b border-ink/5">
              <td className="py-1.5 text-ink/70">
                Friday
              </td>
              <td className="py-1.5 text-ink text-right">
                By Appointment Only
              </td>
            </tr>

            <tr>
              <td className="py-1.5 text-ink/70">
                Saturday – Sunday
              </td>
              <td className="py-1.5 text-ink text-right">
                Not Open
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-ink/10 rounded-2xl overflow-hidden mb-4">
        <iframe
          title="Map to Harrell Orthodontics"
          className="w-full h-72 border-0"
          loading="lazy"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            MAIN_ADDRESS
          )}&output=embed`}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            MAIN_ADDRESS
          )}`}
          target="_blank"
          rel="noreferrer"
          className="bg-breath text-white px-5 py-2.5 rounded-full font-medium"
        >
          Get Directions
        </a>

        <button
          onClick={printDirections}
          className="border border-ink/20 px-5 py-2.5 rounded-full font-medium text-ink/70"
        >
          Print / Send Directions
        </button>
      </div>

      <p className="text-xs text-ink/40 mt-8">
        Note: the practice's own "Physician Written Order" letterhead lists a
        different fax number (256-392-4335) than the one shown above
        (256-329-4335). Both appear in the client's materials. Please confirm
        the correct fax number with Dr. Harrell's office before publishing.
      </p>
    </div>
  );
}