import { Question } from "../../models/Question";
import { AnswerState } from "./FeedBackMessage";
import "./QuestionCounter.css";

interface Props {
  questions: Question[];
  questionSetter: (index: number) => void;
}
export default function QuestionCounter({ questions, questionSetter }: Props) {
  return (
    <header className="flex flex-row gap-4">
      {questions.map((question, index) => (
        <button
          onClick={() => questionSetter(index)}
          key={question.id}
          className={`number bg-gradient-to-tr  transition-all
            rounded-full w-[38px] h-[38px] flex items-center justify-center
            hover:scale-105 ${
              question.answerState === AnswerState.CORRECT && "number-correct"
            }
            ${
              question.answerState === AnswerState.INCORRECT &&
              "number-incorrect"
            }
            ${
              question.answerState === AnswerState.NOT_ANSWERED && "number-idle"
            }
            `}
        >
          <span className="number">{index + 1}</span>
        </button>
      ))}
    </header>
  );
}
