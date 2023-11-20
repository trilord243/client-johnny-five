import { AnswerState } from "../components/Questions/FeedBackMessage";

export interface Question {
  id: number;
  title: string;
  code?: string
  description: string;
  answers: string[];
  correctAnswerIndex: number;
  answerState: AnswerState
}
