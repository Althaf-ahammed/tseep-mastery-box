import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import axios from "../utils/axiosInstance";
import {
  BsEmojiFrown,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsEmojiLaughing,
  BsEmojiDizzy,
} from "react-icons/bs";
import success from "../assets/f8410f79ab62d777a518d30b08b17aa9583a36b5.png";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [comment, setComment] = useState("");

  const { score, userId } = location.state || {
    score: "0/0",
    userId: "000000",
  };

  const handleSubmitFeedback = async () => {
    try {
      if (!selectedEmoji) {
        alert("Please select an emoji rating before submitting.");
        return;
      }

      await axios.post("/feedback", {
        userId: userId.toString(),
        emoji: selectedEmoji,
        comment,
      });

      alert("Feedback submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-108px)] flex flex-col items-center justify-center px-4 bg-white text-center">
      {/* Success Icon */}
      <img src={success} className="w-20 h-20 mb-2" alt="Success" />

      {/* Heading */}
      <h2 className="text-lg md:text-xl mb-2">
        Congratulations you have Successfully Completed The Test
      </h2>

      {/* Score */}
      <div className="text-sm md:text-base mb-4 mt-2">
        <span>Score :</span>{" "}
        <span className="bg-[#FAC167] text-black font-semibold px-3 py-1 rounded-full">
          {score}
        </span>
      </div>

      {/* User ID */}
      <div className="bg-[#224957] text-white font-semibold px-4 py-2 rounded mb-8">
        Your ID : {userId}
      </div>

      {/* Feedback Card */}
      <div className="bg-white rounded shadow-xl p-6 sm:p-8 w-full max-w-3xl text-left">
        <h3 className="font-semibold mb-2 border-b border-gradient w-fit py-4 px-4 sm:px-6">
          Feedback
        </h3>
        <p className="font-semibold text-lg sm:text-xl mb-4">Give us a feedback!</p>
        <p className="text-sm text-gray-600 mb-4 md:whitespace-nowrap ">
          Your input is important for us. We take customer feedback very seriously.
        </p>

        {/* Emoji Selector */}
        <div className="flex gap-2 mb-8 mt-5 text-2xl sm:text-3xl cursor-pointer overflow-x-auto">
          {[
            { icon: <BsEmojiFrown />, value: "very_unsatisfied" },
            { icon: <BsEmojiDizzy />, value: "unsatisfied" },
            { icon: <BsEmojiNeutral />, value: "neutral" },
            { icon: <BsEmojiSmile />, value: "satisfied" },
            { icon: <BsEmojiLaughing />, value: "very_satisfied" },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#D9D9D9] rounded-full flex-shrink-0">
              <div
                className={`p-2 rounded-full hover:bg-gray-200 ${
                  selectedEmoji === item.value ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedEmoji(item.value)}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Comment Box */}
        <textarea
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-[#DFDFDF] rounded p-2 mb-4"
          rows={3}
        />

        <div className="flex justify-center">
          <button
            onClick={handleSubmitFeedback}
            className="w-full sm:w-1/2 bg-[#224957] text-white py-2 rounded hover:bg-[#1b3c46] transition"
          >
            Submit Feedback
          </button>
        </div>
      </div>

      {/* Back to Home */}
      <button
        onClick={() => navigate("/")}
        className="my-8 flex items-center gap-2 text-[#224957] hover:underline"
      >
        <FaHome /> Back to home
      </button>
    </div>
  );
};

export default ResultPage;
