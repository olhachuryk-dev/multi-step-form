import { RouterProvider } from "react-router-dom";
import BrowserRouter from "./router/BrowserRouter";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <RouterProvider router={BrowserRouter} />
    </div>
  );
}

export default App;
