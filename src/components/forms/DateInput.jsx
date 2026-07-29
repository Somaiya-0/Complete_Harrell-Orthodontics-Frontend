import React from "react";

/**
 * Plain typed date field, MM/DD/YYYY only -- no native <input type="date">
 * calendar/scroller. Client was explicit about this twice (7/9 emails):
 * "I don't like having to scroll through calendars."
 */
export default function DateInput({ label, value, onChange, error, required }) {
  function handleChange(e) {
    let v = e.target.value.replace(/[^\d/]/g, "");
    // auto-insert slashes as the person types digits
    const digits = v.replace(/\//g, "");
    if (digits.length <= 2) v = digits;
    else if (digits.length <= 4) v = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    else v = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    onChange(v);
  }

  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/80">{label}{required && " *"}</span>
      <input
        type="text"
        inputMode="numeric"
        placeholder="MM/DD/YYYY"
        value={value}
        onChange={handleChange}
        maxLength={10}
        className={`mt-1 w-full rounded-lg border px-3 py-2 ${error ? "border-red-400" : "border-ink/20"} focus:border-breath`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}
