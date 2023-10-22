import { useState } from "react";

export default function Form() {

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [message, setMessage] = useState('');

    const checkAnswer = () => {
        if (selectedAnswer === 'D') {
            setMessage('¡Respuesta correcta!');
            fetch('http://localhost:3000/correcto')

        } else {
            setMessage('Respuesta incorrecta. Intenta de nuevo.');
            fetch('http://localhost:3000/incorrecto')

        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 w-full text-white px-4">
            <div className="bg-gray-800 w-full max-w-xl p-6 rounded-lg shadow-md">
                <pre className="bg-black p-4 rounded mb-4 overflow-x-auto">
                    <code className="block whitespace-pre-wrap">
                        <span className="text-blue-400">{`let arr = `}</span>
                        <span className="text-yellow-300">{`['foo', 'bar', 'baz'];`}</span>
                        <span className="text-blue-400">{`\narr.length `}</span>
                        <span className="text-red-500">{`= 0;`}</span>
                        <span className="text-blue-400">{`\narr.push(`}</span>
                        <span className="text-yellow-300">{`'bin'`}</span>
                        <span className="text-blue-400">{`);`}</span>
                        <span className="text-green-400">{`\n\nconsole.log(`}</span>
                        <span className="text-blue-400">{`arr`}</span>
                        <span className="text-green-400">{`);`}</span>
                    </code>
                </pre>
                <p className="font-bold mb-4">Que aparece por consola</p>
                <fieldset className="mt-4 space-y-4">
                    <legend className="sr-only">Respuestas</legend>
                    <label className="flex items-center">
                        <input type="radio" name="answer" value="A" className="mr-2" onChange={() => setSelectedAnswer('A')} />
                        a) ['foo', 'bar', 'baz']
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="answer" value="B" className="mr-2" onChange={() => setSelectedAnswer('B')} />
                        b) ['foo', 'bar', 'baz', 'bin']
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="answer" value="C" className="mr-2" onChange={() => setSelectedAnswer('C')} />
                        c) ['bin', 'foo', 'bar', 'baz']
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="answer" value="D" className="mr-2" onChange={() => setSelectedAnswer('D')} />
                        d) ['bin']
                    </label>
                </fieldset>
                <div className="mt-4">
                    <button onClick={checkAnswer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Enviar respuesta
                    </button>
                </div>
                {message && <p className="mt-4 text-red-500">{message}</p>}
            </div>
        </div>
    );

}
