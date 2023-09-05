import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.scss";
import FormCreate from "./pages/FormCreate";
import FormDisplay from "./pages/FormDisplay";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<FormCreate />} />
      <Route path=":formId" element={<FormDisplay />} />
    </Route>
  )
);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
