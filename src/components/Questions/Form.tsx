import { useState } from "react";

import { format } from "prettier";
// import parserBabel from "prettier/parser-babel";

import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useQuestions from "../../hooks/useQuestions";
import FeedBackMessage, { AnswerState } from "./FeedBackMessage";

import Arrow from "../../assets/icons/arrow.svg";

export default function Form() {
  const { questions } = useQuestions();
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>(
    AnswerState.NOT_ANSWERED
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
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

  async function checkAnswer(question: Question, answerIndex: number) {
    try {
      if (answerIndex === question.correctAnswerIndex) {
        setAnswerState(AnswerState.CORRECT);
        setMessage("¡Respuesta correcta!");
        await fetch("http://localhost:3000/correcto");
      } else {
        setAnswerState(AnswerState.INCORRECT);

        setMessage("Respuesta incorrecta. Intenta de nuevo.");
        await fetch("http://localhost:3000/incorrecto");
      }
    } catch (error) {
      console.log("error con la API", error);
    } finally {
      setTimeout(() => {
        setMessage("");
        setAnswerState(AnswerState.NOT_ANSWERED);
        // setCurrentQuestion((prev) => prev + 1);
        console.log("hola");
      }, 2000);
    }
  }

  function getAlphabetLetter(index: number) {
    return String.fromCharCode(97 + index);
  }

  const questionsJSX = questions.map((question) => (
    <section
      key={question.id}
      style={{
        transform: `translateX(${(question.id - 1 - currentQuestion ) * 120}%)`,
        transition: "transform 0.3s ease-in-out",
      }}
      className="flex flex-col absolute h-full"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">{question.title}</h2>
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
        onClick={() => checkAnswer(question, selectedAnswer)}
        className="bg-blue-500 hover:bg-blue-700 text-white 
          font-bold py-2 px-4 rounded 
          max-w-[10rem] self-center"
      >
        Enviar respuesta
      </button>

      <FeedBackMessage message={message} correct={answerState} />

      <footer className="mt-auto mb-8 flex flex-row justify-evenly">
        <button
          className="rounded-full border-gray-600 border-2 
          h-14 w-14 text-white relative
          backdrop-blur-lg hover:bg-gray-600/50 active:scale-95 transition-all"
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
        >
          <img
            src={Arrow}
            alt="Siguiente pregunta"
            className="h-8 rotate-180 absolute top-1/2 -translate-y-1/2 left-[0.5rem]"
          />
        </button>

        <button
          className="rounded-full  border-gray-600 border-2 
          h-14 w-14 text-white relative
          backdrop-blur-lg hover:bg-gray-600/50 active:scale-95 transition-all"
          onClick={() => setCurrentQuestion((prev) => prev + 1)}
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
    <div
      id="gradient-wrapper"
      className={`bg-gradient-to-tr rounded-lg p-1 w-full max-w-[30rem] ${
        answerState == AnswerState.CORRECT && "from-green-400 to-blue-500"
      }
      ${answerState == AnswerState.INCORRECT && "from-red-500 to-orange-500"}
      `}
    >
      <div
        className="bg-gray-800 w-full max-w-xl p-6 rounded-lg shadow-md
        relative overflow-hidden min-h-[40rem]"
      >
        {questions.length === 0 ? (
          <p className="text-white">Cargando...</p>
        ) : (
          questionsJSX
        )}
      </div>
    </div>
  );
}
