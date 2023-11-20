export enum AnswerState {
  CORRECT,
  INCORRECT,
  NOT_ANSWERED,
}

interface Props {
  message: string;
  correct: AnswerState;
}
export default function FeedBackMessage({ message, correct }: Props) {
  return (
    message && (
      <p
        className={`mt-4 text-center  font-bold text-xl
      ${
        correct === AnswerState.CORRECT ? " text-green-500" : " text-red-500"
      } `}
      >
        {message}
      </p>
    )
  );
}
