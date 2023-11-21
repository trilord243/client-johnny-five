import { useState } from "react";

import { format } from "prettier";
// import parserBabel from "prettier/parser-babel";

import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useQuestions from "../../hooks/useQuestions";
import FeedBackMessage, { AnswerState } from "./FeedBackMessage";

import Arrow from "../../assets/icons/arrow.svg";
import QuestionCounter from "./QuestionCounter";
import { Question } from "../../models/Question";

export default function Form() {
  const { questions } = useQuestions();
  const [selectedAnswer, setSelectedAnswer] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [message, setMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const codeString = `
function HelloWorld({greeting = "hello", greeted = '"World"', silent = false, onMouseOver,}) {

}
`;

  // FIXME - Conseguir manera de formatear con prettier
  // const formattedCodeString = format(codeString, {
  //   parser: "babel",
  //   plugins: [parserBabel],
  // });

  async function checkAnswer(question: Question, answerIndex: number) {
    if (isChecking) return;
    setIsChecking(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    try {
      if (answerIndex === question.correctAnswerIndex) {
        question.answerState = AnswerState.CORRECT;
        setMessage("¡Respuesta correcta!");
        await fetch("http://localhost:3000/correcto");
      } else {
        question.answerState = AnswerState.INCORRECT;

        setMessage("Respuesta incorrecta. Intenta de nuevo.");
        await fetch("http://localhost:3000/incorrecto");
      }
    } catch (error) {
      console.log("error con la API", error);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }

      const timeout = setTimeout(() => {
        if (!isChecking) {
          setMessage("");
          setSelectedAnswer(0);
          if (currentQuestion < questions.length - 1)
            setCurrentQuestion((prev) => prev + 1);
        }
      }, 1000);

      setIsChecking(false);
      setTimeoutId(timeout);
    }
  }

  function getAlphabetLetter(index: number) {
    return String.fromCharCode(97 + index);
  }

  function moveQuestion(index: number) {
    if (isChecking) return;
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    setCurrentQuestion((prev) => prev + index);
  }

  const questionsJSX = questions.map((question) => (
    <section
      key={question.id}
      style={{
        transform: `translateX(${(question.id - 1 - currentQuestion) * 120}%)`,
        transition: "transform 0.3s ease-in-out",
      }}
      className="flex flex-col absolute h-full w-[90%] mt-10"
    >
      <h2 className="text-2xl font-bold mt-2 mb-4 text-center">{question.title}</h2>
      <p>{question.description}</p>
      {question.code && (
        <SyntaxHighlighter
          language="javascript"
          style={{
            ...atomOneDark,
            hljs: {
              width: "100%",
              // maxWidth: '23rem',
              background: "black",
              padding: "1rem",
              borderRadius: "0.25rem",
              fontSize: "1.2rem",
            },
            "hljs-string": {
              color: "orange",
            },
          }}
          showLineNumbers
        >
          {question.code}
        </SyntaxHighlighter>
      )}
      <fieldset className="my-4 space-y-4">
        <legend className="sr-only">Respuestas</legend>
        {question.answers.map((answer, index) => (
          <label key={index} className="flex items-center">
            <input
              type="radio"
              name="answer"
              value={index}
              className="mr-2"
              onChange={() => setSelectedAnswer(index)}
            />
            {`${getAlphabetLetter(index)}) ${answer}`}
          </label>
        ))}
      </fieldset>

      <button
        disabled={isChecking}
        onClick={() => checkAnswer(question, selectedAnswer)}
        className="bg-blue-500 hover:bg-blue-700 text-white 
          font-bold py-2 px-4 rounded disabled:opacity-50
          max-w-[10rem] self-center mt-auto mb-8"
      >
        Enviar respuesta
      </button>

      <footer className={`flex flex-row justify-evenly mb-20`}>
        <button
          disabled={isChecking || currentQuestion === 0}
          className="rounded-full border-gray-600 border-2 
          h-14 w-14 text-white relative disabled:opacity-50
          backdrop-blur-lg hover:bg-gray-600/50 active:scale-95 transition-all"
          onClick={() => moveQuestion(-1)}
        >
          <img
            src={Arrow}
            alt="Siguiente pregunta"
            className="h-8 rotate-180 absolute top-1/2 -translate-y-1/2 left-[0.5rem]"
          />
        </button>

        <button
          disabled={isChecking || currentQuestion === questions.length - 1}
          className="rounded-full  border-gray-600 border-2 
          h-14 w-14 text-white relative disabled:opacity-50
          backdrop-blur-lg hover:bg-gray-600/50 active:scale-95 transition-all"
          onClick={() => moveQuestion(+1)}
        >
          <img
            src={Arrow}
            alt="Siguiente pregunta"
            className="h-8 absolute top-1/2 -translate-y-1/2 right-[0.5rem]"
          />
        </button>
      </footer>
    </section>
  ));

  return (
    <>
      <div
        id="gradient-wrapper"
        className={`bg-gradient-to-tr rounded-lg p-1 w-full max-w-[36rem]
        flex justify-center ${
          questions[currentQuestion]?.answerState == AnswerState.CORRECT &&
          "from-green-400 to-blue-500"
        }
      ${
        questions[currentQuestion]?.answerState == AnswerState.INCORRECT &&
        "from-red-500 to-orange-500"
      }
      `}
      >
        <FeedBackMessage
          message={message}
          correct={questions[currentQuestion]?.answerState}
        />
        <div
          className="bg-gray-800 w-full max-w-xl p-6 rounded-lg shadow-md
        relative overflow-hidden min-h-[40rem]
        flex flex-col items-center"
        >
          <QuestionCounter
            questions={questions}
            questionSetter={(index: number) => {
              setCurrentQuestion(index);
              console.log("hola");
            }}
          />
          {questions.length === 0 ? (
            <p className="text-white">Cargando...</p>
          ) : (
            questionsJSX
          )}
        </div>
      </div>
    </>
  );
}
