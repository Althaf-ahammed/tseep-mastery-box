import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { BsGrid1X2 } from "react-icons/bs";
import icon from "../assets/transaction-minus.png";

const TestPage = () => {
  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState(new Set());
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(`/tests/${id}`);
        setTest(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTest();
  }, [id]);

  useEffect(() => {
    setVisitedQuestions((prev) => new Set(prev).add(currentQuestion));
  }, [currentQuestion]);

  const handleOptionSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = () => {
    let score = 0;
    const marksPerQuestion = 5;
    const total = test.questions.length;

    test.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        score += marksPerQuestion;
      }
    });

    const userId = Math.floor(100000 + Math.random() * 900000);

    navigate("/result", {
      state: {
        score: `${score}/${total * marksPerQuestion}`,
        userId: userId,
      },
    });
  };

  if (!test) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const question = test.questions[currentQuestion];

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl text-center font-semibold text-[#2a586f] mb-6 px-2">
        Assess Your{" "}
        <span className="relative inline-block">
          Intelligence
          <span className="absolute left-0 bottom-1.5 w-full h-1.75 bg-yellow-400 -z-10"></span>
        </span>
      </h2>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={`flex flex-col bg-white min-h-[calc(100vh-108px)] p-4 transition-all duration-300 ${
            showSidebar ? "w-full md:w-1/5 shadow-xl" : "w-16 shadow-none"
          }`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center justify-end gap-2 text-[#565555] p-2 rounded transition text-sm mb-4 md:mb-2"
          >
            <BsGrid1X2 className="w-6 h-6" />
          </button>

          {showSidebar && (
            <div className="flex flex-col flex-grow justify-between mb-24 md:mb-24">
              {/* Question Palette */}
              <div
                className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-4 gap-1 overflow-x-auto"
              >
                {test.questions.map((_, index) => {
                  const isAttempted = selectedAnswers[index] ? true : false;
                  const isVisited = visitedQuestions.has(index);
                  const isCurrent = index === currentQuestion;

                  let bgColor = "bg-white border border-[#2A586F]";

                  if (isAttempted) {
                    bgColor = "bg-[#2BB673] text-white";
                  } else if (isVisited) {
                    bgColor = "bg-[#A79E9E] text-white";
                  }

                  if (isCurrent) {
                    bgColor = "bg-[#F7FFEB] border border-[#2A586F]";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`rounded w-12 h-10 md:w-14 md:h-12 flex items-center justify-center text-xs ${bgColor}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 text-xs space-y-1 shadow p-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#2BB673" }}
                  ></div>
                  <span>Attended</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#A79E9E" }}
                  ></div>
                  <span>Not Attended</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: "#FFFFFF" }}
                  ></div>
                  <span>Yet to Attend</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div
          className={`flex-grow flex ${showSidebar ? "" : "justify-center"}`}
        >
          <div className="w-full max-w-[900px] pl-0 md:pl-4 px-4 md:px-0">
            {/* Progress Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
              <div className="w-full bg-gray-200 rounded-full h-2 md:mr-4">
                <div
                  className="bg-[#224957] h-2 rounded-full"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / test.questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="text-sm md:mr-4">
                {currentQuestion + 1}/{test.questions.length}
              </div>
              <div className="flex items-center gap-2 bg-[#FAC167] text-yellow-800 px-2 py-1 rounded text-nowrap">
                <FaRegClock /> {test.duration} Min
              </div>
            </div>

            {/* Question */}
            <div className="bg-[#F4F4F4] p-4 md:p-7 rounded shadow">
              <div className="flex items-center gap-2 mb-6 md:mb-9">
                <div className="bg-[#224957] text-white rounded-full w-8 h-8 flex items-center justify-center">
                  {currentQuestion + 1}
                </div>
                <p className="font-semibold">{question.questionText}</p>
              </div>

              <div className="space-y-2 bg-white p-4 rounded">
                {question.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
                      selectedAnswers[currentQuestion] === option
                        ? "bg-green-100 border-green-400"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option}
                      checked={selectedAnswers[currentQuestion] === option}
                      onChange={() => handleOptionSelect(option)}
                      className="form-radio text-[#224957] accent-[#217C58]"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 items-center">
                <img src={icon} className="w-7 h-7 hidden md:block" />
                <div className="flex gap-2 w-full justify-between md:justify-end">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-1 bg-[#224957] text-white px-4 py-2 rounded hover:bg-[#1b3c46] disabled:hidden"
                  >
                    <MdArrowBack /> Previous
                  </button>

                  {currentQuestion === test.questions.length - 1 ? (
                    <button
                      onClick={handleSubmitTest}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      Submit Test
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-1 bg-[#224957] text-white px-4 py-2 rounded hover:bg-[#1b3c46] transition"
                    >
                      Next <MdArrowForward />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
