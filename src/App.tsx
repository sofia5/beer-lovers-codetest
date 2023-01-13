import "./App.scss";
import Header from "./components/Header";
import BeerList from "./components/BeerList";

function App() {
  return (
    <>
      <Header />
      <div className="main-content-wrapper">
        <BeerList />
      </div>
    </>
  );
}

export default App;
