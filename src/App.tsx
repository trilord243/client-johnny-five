import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className=" w-full h-full min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <Form />
      </div>
    </div>
  );
}


export default App
