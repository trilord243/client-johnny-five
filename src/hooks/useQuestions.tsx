import { useEffect, useState } from "react";
import { Question } from "../models/Question";
import { AnswerState } from "../components/Questions/FeedBackMessage";

export default function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions([
      {
        id: 1,
        title: "¿Qué aparece por consola?",

        description: "",
        code: `let arr = ['foo', 'bar', 'baz'];
arr.length = 0; 
arr.push('bin');
        
console.log(arr);`,
        answers: [
          "['foo', 'bar', 'baz']",
          "['foo', 'bar', 'baz', 'bin']",
          "['bin', 'foo', 'bar', 'baz']",
          "['bin']",
        ],
        correctAnswerIndex: 3,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 2,
        title:
          "¿Cuáles son los 4 pilares de la Programación Orientada a Objetos (POO?)",
        description: "",
        answers: [
          "Abstracción, Encapsulamiento, Herencia y Polimorfismo",
          "Abstracción, Funcionalidad, Encapsulamiento y Legible",
          "Funcional, Heredable, Legible y Reutilizable",
          "Herencia, Polimorfismo, Funcional y De tipado",
        ],
        correctAnswerIndex: 0,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 3,
        title: "Cuál de las siguientes complejidades Big O es más eficiente?",
        description: "",
        answers: ["O(n^2)", "O(n)", "O(log(n))", "O(n*log(n))"],
        correctAnswerIndex: 1,
        answerState: AnswerState.NOT_ANSWERED,
      },
    ]);
  }, []);

  return { questions };
}
