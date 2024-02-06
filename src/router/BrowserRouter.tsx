import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import FormCreate from "../pages/FormCreate";
import FormDisplay from "../pages/FormDisplay";

const BrowserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<FormCreate />} />
      <Route path=":formId" element={<FormDisplay />} />
    </Route>
  )
);

export default BrowserRouter;
