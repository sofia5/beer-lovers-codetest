import "./App.scss";
import Header from "./components/header";
import BeerList from "./components/beerList";

function App() {
  return (
    <>
      <Header />
      <div className="main-content-wrapper">
        <div className="container">
          <BeerList />
        </div>
      </div>
    </>
  );
}

export default App;
