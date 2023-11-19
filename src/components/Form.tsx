import { useState } from "react";

import { format } from "prettier";
// import parserBabel from "prettier/parser-babel";

import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Form() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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

  const checkAnswer = () => {
    if (selectedAnswer === "D") {
      setMessage("¡Respuesta correcta!");
      fetch("http://localhost:3000/correcto");
    } else {
      setMessage("Respuesta incorrecta. Intenta de nuevo.");
      fetch("http://localhost:3000/incorrecto");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 w-full text-white px-4">
      <div className="bg-gray-800 w-full max-w-xl p-6 rounded-lg shadow-md">
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
          {`let arr = ['foo', 'bar', 'baz'];
arr.length = 0; //hola
arr.push('bin');

console.log(arr);`}
        </SyntaxHighlighter>

        <p className="font-bold mb-4">Que aparece por consola</p>

        <fieldset className="mt-4 space-y-4">
          <legend className="sr-only">Respuestas</legend>
          <label className="flex items-center">
            <input
              type="radio"
              name="answer"
              value="A"
              className="mr-2"
              onChange={() => setSelectedAnswer("A")}
            />
            a) ['foo', 'bar', 'baz']
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="answer"
              value="B"
              className="mr-2"
              onChange={() => setSelectedAnswer("B")}
            />
            b) ['foo', 'bar', 'baz', 'bin']
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="answer"
              value="C"
              className="mr-2"
              onChange={() => setSelectedAnswer("C")}
            />
            c) ['bin', 'foo', 'bar', 'baz']
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="answer"
              value="D"
              className="mr-2"
              onChange={() => setSelectedAnswer("D")}
            />
            d) ['bin']
          </label>
        </fieldset>
        <div className="mt-4">
          <button
            onClick={checkAnswer}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enviar respuesta
          </button>
        </div>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
}
