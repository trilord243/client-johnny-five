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
      {
        id: 2,
        title:
          "¿Cuáles son los 4 pilares de la Programación Orientada a Objetos (POO?)",
        description: "",
        answers: [
          "Abstracción, Encapsulamiento, Herencia y Polimorfismo",
          "Abstracción, Funcionalidad, Encapsulamiento y Legible",
          "Funcional, Heredable, Legible y Reutilizable",
          "Herencia, Polimorfismo, Funcional y De tipado"
        ],
        correctAnswerIndex: 1,
      },
    ]);
  }, []);

  return { questions };
}
