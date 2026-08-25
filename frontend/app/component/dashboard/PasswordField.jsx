"use client";

import { useId, useState } from "react";

function EyeIcon({ off = false }) {
  if (off) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M3 3l18 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M10.6 10.7a2.2 2.2 0 003.1 3.1M9.9 5.5A10.7 10.7 0 0121 12c-.5.9-1.2 1.8-2 2.6M6.5 6.7C4.8 8.1 3.5 9.9 3 12c1.6 3.6 5.4 7 9 7 1.3 0 2.6-.3 3.8-.9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M2.8 12S6.2 6.5 12 6.5 21.2 12 21.2 12 17.8 17.5 12 17.5 2.8 12 2.8 12z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder = "Enter your password",
  autoComplete = "current-password",
  required = false,
  disabled = false,
  inputClassName = "",
  toggleClassName = "",
}) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {label ? (
        <label
          htmlFor={fieldId}
          className="mb-1.5 block font-montserrat text-sm font-semibold text-[#4f4f4f]"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          id={fieldId}
          type={visible ? "text" : "password"}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pr-12 ${inputClassName}`}
        />
        <button
          type="button"
          tabIndex={0}
          disabled={disabled}
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className={`absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[#6b6b6b] transition hover:bg-black/5 hover:text-[#111111] disabled:opacity-50 ${toggleClassName}`}
        >
          <EyeIcon off={visible} />
        </button>
      </div>
    </div>
  );
}
