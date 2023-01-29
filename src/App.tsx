import { Routes, Route } from "react-router-dom";
import "./scss/App.scss";
import Header from "./components/shared/Header";
import BeerList from "./components/beer/BeerList";
import BeerDetails from "./components/beer/BeerDetails";
import NotFound from "./components/shared/NotFound";
import RandomizeBeer from "./components/beer/RandomizeBeer";

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
