import { useEffect, useState } from "react";
import { Question } from "../models/Question";
import { AnswerState } from "../components/Questions/FeedBackMessage";

export default function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const allQuestions: Question[] = [
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
      title: "¿Cuál de las siguientes complejidades Big O es más eficiente?",
      description: "",
      answers: ["O(n^2)", "O(n)", "O(log(n))", "O(n*log(n))"],
      correctAnswerIndex: 2,
      answerState: AnswerState.NOT_ANSWERED,
    },
    {
      id: 4,
      title: "¿Cuáles son los nombres de los gatos de la unmimet?",
      description: "",
      answers: [
        "Pelusa, Bebesito, Lillith, Oreo",
        "Choco, Bebesito, Kitty, Pelusa",
        "Bebeso, Pelusa, Oreo, Lilly",
        "Lillith, Bebesito, Pelusa, Oreo",
      ],
      correctAnswerIndex: 2,
      answerState: AnswerState.NOT_ANSWERED,
    },
    {
      id: 5,
      title: "¿Qué complejidad tiene este algoritmo?",
      code: `function factorial(n){
  if(n === 0) return 1;

  return n * factorial(n-1);
}`,
      description: "",
      answers: ["O(n)", "O(n^2)", "O(log(n))", "O(n!)"],
      correctAnswerIndex: 3,
      answerState: AnswerState.NOT_ANSWERED,
    },
    {
      id: 6,
      title: "¿Qué complejidad tiene este algoritmo?",
      code: `function fibonacci(n){
  if(n <= 1) return n;

  return fibonacci(n-1) + fibonacci(n-2);
}`,
      description: "",
      answers: ["O(n!)", "O(n^2)", "O(log(n))", "O(2^n)"],
      correctAnswerIndex: 3,
      answerState: AnswerState.NOT_ANSWERED,
    },
    
  ];

  useEffect(() => {
    setQuestions(allQuestions);
  }, []);

  return { questions };
}
