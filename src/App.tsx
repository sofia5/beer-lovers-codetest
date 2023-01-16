import { Routes, Route } from "react-router-dom";
import "./scss/App.scss";
import Header from "./components/header";
import BeerList from "./components/beerList";
import BeerDetails from "./components/beerDetails";
import NotFound from "./components/notFound";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main-content-wrapper container">
        <Routes>
          <Route path="/" element={<BeerList />} />
          <Route path="/:id" element={<BeerDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
