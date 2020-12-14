import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import "./Udn.css";
import ItemList from "./ItemList";
import Login from "./Login";
import ItemDetail from "./ItemDetail";
import ItemEdit from "./ItemEdit";

function App() {

  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/items">
            <ItemList />
          </Route>
          <Route path="/itemdetail">
            <ItemDetail />
          </Route>
          <Route path="/itemedit">
            <ItemEdit />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
