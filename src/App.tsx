import Form from "./components/Questions/Form";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className=" w-full h-full min-h-screen">
      <Navbar />
      <div className="min flex items-center justify-center ">
        <div
          className="flex flex-col items-center justify-center bg-gray-900
          w-full h-[calc(100svh-6.5rem)] text-white px-4"
        >
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
