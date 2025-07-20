import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    if (accepted) {
      navigate("/test/687bf9f49dc68eac0dc0ee99"); // Adjust your route as needed
    } else {
      alert("Please accept the terms and conditions to proceed.");
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-108px)] bg-white">
      {/* Centered Welcome Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-3xl md:text-7xl font-semibold mb-4">
            Welcome to{" "}
            <span className="relative z-10">
              TSEEP Mastery Box
              <span className="absolute left-0 bottom-5 w-full h-4 bg-yellow-400 -z-10"></span>
            </span>
          </h1>
          <p className="text-gray-600 text-base md:text-3xl">
            Unlock your potential with{" "}
            <span className="font-semibold">AI inspired tool</span>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t w-full max-w-7xl mx-auto my-4 mb-7"></div>

      {/* Bottom Terms & Button */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 pb-22">
        <label className="flex items-start space-x-2 text-left text-sm md:text-base mb-4 md:mb-0">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1"
          />
          <span>
            I confirm that I have read and accept the terms and conditions and
            privacy policy.
          </span>
        </label>

        <button
          onClick={handleStart}
          className={`bg-[#224957] text-white px-6 py-2 rounded hover:bg-[#1b3c46] transition ${
            !accepted ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!accepted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
