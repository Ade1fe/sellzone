import { createBrowserRouter } from "react-router-dom";
import { AddItemForm, DisplayItem, Homepage, Landingpage, ListOfItems } from "./pages";




const Router = createBrowserRouter([
  {
    path: '/',
    element: <Landingpage />
  },
  {
    path: "homepage",
    element: <Homepage />
  },
  {
    path: "listofitem",
    element: <ListOfItems />
  },
  {
    path: "admin",
    element: <AddItemForm />
  },
  {
    path: "item",
    element: <DisplayItem  />
  },
  

]);

export default Router;