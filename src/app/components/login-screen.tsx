import { useState } from "react";
import svgPaths from "../../imports/svg-d410xzhft7";
import { supabase } from "../../lib/supabase";

interface LoginScreenProps {
  darkMode: boolean;
}

export function LoginScreen({ darkMode }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (err) setError(err.message);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });
    if (err) setError(err.message);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full p-4">
      <div
        className={`flex flex-col gap-[34px] items-center justify-center p-[32px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] w-full max-w-[400px] ${
          darkMode ? "bg-[#1e1e2e]" : "bg-white"
        }`}
      >
        {/* Logo */}
        <div className="h-[30px] relative shrink-0 w-[188px]">
          <div className="absolute left-0 size-[30px] top-0">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 30 30"
            >
              <g>
                <mask
                  height="30"
                  id="mask0_login"
                  maskUnits="userSpaceOnUse"
                  style={{ maskType: "alpha" }}
                  width="30"
                  x="0"
                  y="0"
                >
                  <circle
                    cx="15"
                    cy="15"
                    fill={darkMode ? "white" : "white"}
                    r="14.5"
                    stroke={darkMode ? "white" : "#060606"}
                  />
                </mask>
                <g mask="url(#mask0_login)">
                  <path
                    d={svgPaths.p11ca8200}
                    fill={darkMode ? "white" : "black"}
                    stroke={darkMode ? "white" : "#060606"}
                  />
                </g>
                <circle
                  cx="15"
                  cy="15"
                  r="14.5"
                  stroke={darkMode ? "white" : "black"}
                  fill="none"
                />
              </g>
            </svg>
          </div>
          <div
            className={`-translate-y-1/2 absolute flex flex-col font-['Inter',sans-serif] justify-center leading-[0] left-[37px] top-[15px] whitespace-nowrap ${
              darkMode ? "text-white" : "text-black"
            }`}
            style={{ fontWeight: 700, fontSize: 20 }}
          >
            <p className="leading-[normal]">DB WORKOUTS</p>
          </div>
        </div>

        {/* Input fields */}
        <div className="flex items-start justify-center relative shrink-0">
          <div
            aria-hidden="true"
            className={`absolute border border-solid inset-[-1px] pointer-events-none ${
              darkMode ? "border-[#444]" : "border-[#c2c2c2]"
            }`}
          />
          <div
            className={`min-h-[56px] min-w-[150px] relative shrink-0 ${
              darkMode ? "bg-[#2a2a3a]" : "bg-white"
            }`}
          >
            <div className="flex flex-row items-center justify-center min-h-[inherit] min-w-[inherit] size-full">
              <div className="flex items-center justify-center min-h-[inherit] min-w-[inherit] p-[10px] relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`font-['Inter',sans-serif] text-[12px] text-center bg-transparent outline-none w-full ${
                    darkMode
                      ? "text-white placeholder-[#666]"
                      : "text-black placeholder-[#afafaf]"
                  }`}
                  style={{ fontWeight: 700 }}
                />
              </div>
            </div>
          </div>
          <div className="h-[56px] relative shrink-0 w-px">
            <div
              className={`absolute h-[56px] left-0 top-0 w-px ${
                darkMode ? "bg-[#444]" : "bg-[#c2c2c2]"
              }`}
            />
          </div>
          <div
            className={`min-h-[56px] min-w-[150px] relative shrink-0 ${
              darkMode ? "bg-[#2a2a3a]" : "bg-white"
            }`}
          >
            <div className="flex flex-row items-center justify-center min-h-[inherit] min-w-[inherit] size-full">
              <div className="flex items-center justify-center min-h-[inherit] min-w-[inherit] p-[10px] relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`font-['Inter',sans-serif] text-[12px] text-center bg-transparent outline-none w-full ${
                    darkMode
                      ? "text-white placeholder-[#666]"
                      : "text-black placeholder-[#afafaf]"
                  }`}
                  style={{ fontWeight: 700 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="font-['Inter',sans-serif] text-[13px] text-red-500 text-center" style={{ fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-[34px] items-center justify-center relative shrink-0">
          <button
            onClick={handleCreate}
            disabled={loading}
            className={`px-[16px] py-[8px] font-['Inter',sans-serif] text-[20px] text-[#008ede] cursor-pointer border-none transition-opacity ${
              darkMode ? "bg-[#1e1e2e]" : "bg-white"
            } ${loading ? "opacity-50" : "hover:opacity-70"}`}
            style={{ fontWeight: 700 }}
          >
            Create
          </button>
          <button
            onClick={handleSignIn}
            disabled={loading}
            className={`bg-[#008ede] px-[16px] py-[8px] font-['Inter',sans-serif] text-[20px] text-white cursor-pointer border-none transition-opacity ${
              loading ? "opacity-50" : "hover:bg-[#007acc]"
            }`}
            style={{ fontWeight: 700 }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}