import { useEffect, useState } from "react";

export default function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions([
      {
        id: 1,
        title: "¿Qué aparece por consola?",

        description: "",
        code: `let arr = ['foo', 'bar', 'baz'];
arr.length = 0; //hola
arr.push('bin');
        
console.log(arr);`,
        answers: [
          "['foo', 'bar', 'baz']",
          "['foo', 'bar', 'baz', 'bin']",
          "['bin', 'foo', 'bar', 'baz']",
          "['bin']", //correcta
        ],
        correctAnswerIndex: 3,
      },
    ]);
  }, []);

  return { questions };
}
