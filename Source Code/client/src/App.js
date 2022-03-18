import "./App.css";
import Footer from "./components/footer";
import Member from "./components/member";
import Vehicle from "./components/vehicle";
import Header from "./components/header";
import Home from "./components/home";
import Lists from "./components/lists";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/members" component={Member} />
          <Route path="/vehicles" component={Vehicle} />
          <Route path="/lists" component={Lists} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
