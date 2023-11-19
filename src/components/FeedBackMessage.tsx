interface Props {
  message: string;
  correct: boolean;
}
export default function FeedBackMessage({ message, correct }: Props) {
  return (
    message && (
      <p
        className={`mt-4 text-center  font-bold text-xl
      ${correct ? " text-green-500" : " text-red-500"} `}
      >
        {message}
      </p>
    )
  );
}
