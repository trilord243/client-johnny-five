import { useEffect, useState } from "react";
import { Question } from "../models/Question";
import { AnswerState } from "../components/Questions/FeedBackMessage";

export default function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions([
      {
        id: 1,
        title:
          "¿Cuál es la complejidad temporal del algoritmo de búsqueda binaria?",
        description: "",
        answers: ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"],
        correctAnswerIndex: 1,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 2,
        title:
          "¿Qué estructura de datos se utiliza generalmente para implementar una cola?",
        description: "",
        answers: ["Array", "Lista enlazada", "Árbol binario", "Pila"],
        correctAnswerIndex: 1,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 3,
        title: "¿Cuál es la característica principal de una tabla hash?",
        description: "",
        answers: [
          "Permite búsquedas en tiempo constante promedio",
          "Mantiene los elementos ordenados",
          "Es una estructura de datos de tipo LIFO",
          "Es inmutable",
        ],
        correctAnswerIndex: 0,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 4,
        title:
          "¿Cuál es el mejor caso de complejidad temporal para el algoritmo de ordenación Quicksort?",
        description: "",
        answers: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"],
        correctAnswerIndex: 1,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 5,
        title:
          "¿Qué técnica de diseño de algoritmos se utiliza en el algoritmo de Fibonacci con programación dinámica?",
        description: "",
        answers: [
          "Dividir y conquistar",
          "Greedy",
          "Backtracking",
          "Memoización",
        ],
        correctAnswerIndex: 4,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 6,
        title:
          "¿Qué estructura de datos es más adecuada para implementar un algoritmo de Dijkstra?",
        description: "",
        answers: [
          "Pila",
          "Cola de prioridad",
          "Árbol binario",
          "Lista enlazada",
        ],
        correctAnswerIndex: 1,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 7,
        title: "¿Qué es un árbol AVL?",
        description: "",
        answers: [
          "Un árbol binario de búsqueda balanceado",
          "Un tipo de lista enlazada",
          "Una pila de prioridad",
          "Un árbol no balanceado",
        ],
        correctAnswerIndex: 0,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 8,
        title: "¿Cuál es la diferencia entre un árbol B y un árbol B+?",
        description: "",
        answers: [
          "Un árbol B es un árbol de búsqueda, un árbol B+ no lo es",
          "En un árbol B+, las hojas están enlazadas en una lista enlazada",
          "Un árbol B tiene una complejidad diferente para las operaciones de búsqueda",
          "No hay diferencia",
        ],
        correctAnswerIndex: 1,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 9,
        title: "¿Cuál es la complejidad espacial del algoritmo Merge Sort?",
        description: "",
        answers: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswerIndex: 3,
        answerState: AnswerState.NOT_ANSWERED,
      },
      {
        id: 10,
        title: "¿Qué es un 'grafo dirigido acíclico' (DAG)?",
        description: "",
        answers: [
          "Un grafo sin ciclos dirigido",
          "Un grafo con ciclos dirigido",
          "Un grafo sin ciclos no dirigido",
          "Un grafo con ciclos no dirigido",
        ],
        correctAnswerIndex: 0,
        answerState: AnswerState.NOT_ANSWERED,
      },
    ]);
  }, []);

  return { questions };
}
