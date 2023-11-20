import { useState } from "react";

import { format } from "prettier";
// import parserBabel from "prettier/parser-babel";

import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useQuestions from "../hooks/useQuestions";
import FeedBackMessage, { AnswerState } from "./FeedBackMessage";

export default function Form() {
  const { questions } = useQuestions();
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.NOT_ANSWERED);
  const [message, setMessage] = useState("");

  const codeString = `
function HelloWorld({greeting = "hello", greeted = '"World"', silent = false, onMouseOver,}) {

}
`;

  // FIXME - Conseguir manera de formatear con prettier
  // const formattedCodeString = format(codeString, {
  //   parser: "babel",
  //   plugins: [parserBabel],
  // });

  // const checkAnswer = () => {
  //   if (selectedAnswer === "D") {
  //     setMessage("¡Respuesta correcta!");
  //     fetch("http://localhost:3000/correcto");
  //   } else {
  //     setMessage("Respuesta incorrecta. Intenta de nuevo.");
  //     fetch("http://localhost:3000/incorrecto");
  //   }
  // };

  function checkAnswer(question: Question, answerIndex: number) {
    if (answerIndex === question.correctAnswerIndex) {
      setAnswerState(AnswerState.CORRECT);
      setMessage("¡Respuesta correcta!");
      fetch("http://localhost:3000/correcto");
    } else {
      setAnswerState(AnswerState.INCORRECT);

      setMessage("Respuesta incorrecta. Intenta de nuevo.");
      fetch("http://localhost:3000/incorrecto");
    }
  }

  function getAlphabetLetter(index: number) {
    return String.fromCharCode(97 + index);
  }

  const questionsJSX = questions.map((question) => (
    <section key={question.id} className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center">{question.title}</h2>
      <p>{question.description}</p>
      {question.code && (
        <SyntaxHighlighter
          language="javascript"
          style={{
            ...atomOneDark,
            hljs: {
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
        onClick={() => checkAnswer(question, selectedAnswer)}
        className="bg-blue-500 hover:bg-blue-700 text-white 
          font-bold py-2 px-4 rounded 
          max-w-[10rem] self-center"
      >
        Enviar respuesta
      </button>

      <FeedBackMessage message={message} correct={answerState} />
      {/* {message && <p className="mt-4 text-red-500">{message}</p>} */}
    </section>
  ));

  return (
    <div
      id="gradient-wrapper"
      className={`bg-gradient-to-tr rounded-lg p-1 ${
        answerState == AnswerState.CORRECT
          ? "from-green-400 to-blue-500"
          : "from-red-500 to-orange-500"
      }`}
    >
      <div className="bg-gray-800 w-full max-w-xl p-6 rounded-lg shadow-md">
        {questions.length === 0 ? (
          <p className="text-white">Cargando...</p>
        ) : (
          questionsJSX
        )}
      </div>
    </div>
  );
}
