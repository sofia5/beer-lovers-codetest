import { Routes, Route } from "react-router-dom";
import "./scss/App.scss";
import Header from "./components/Header";
import BeerList from "./components/BeerList";
import BeerDetails from "./components/BeerDetails";
import NotFound from "./components/NotFound";
import RandomizeBeer from "./components/RandomizeBeer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main-content-wrapper container">
        <Routes>
          <Route path="/" element={<BeerList />} />
          <Route path="/:id" element={<BeerDetails />} />
          <Route path="/random" element={<RandomizeBeer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
