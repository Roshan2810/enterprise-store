import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "./ui/containers/App";
import ProductDetail from "./ui/containers/ProducDetail";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route  path="/product-detail/:productId" component={ProductDetail} />
      </Switch>
    </Router>
  );
};

export default Root;
