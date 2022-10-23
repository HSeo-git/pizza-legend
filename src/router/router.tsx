import { createBrowserRouter } from "react-router-dom";
import SimpleTest from "../pages/SimpleTest";
import PizzaLegend from "../pages/PizzaLegend/PizzaLegend";

const router = createBrowserRouter([
  { path: "/", element: <PizzaLegend /> },
  { path: "/test", element: <SimpleTest /> },
]);

export default router;
