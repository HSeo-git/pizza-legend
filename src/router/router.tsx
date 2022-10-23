import { createBrowserRouter } from "react-router-dom";
import SimpleTest from "../pages/SimpleTest";
import PizzaLegend from "../pages/PizzaLegend/PizzaLegend";

const router = createBrowserRouter([
  { path: "/", element: <SimpleTest /> },
  { path: "/pizza-legend", element: <PizzaLegend /> },
]);

export default router;
