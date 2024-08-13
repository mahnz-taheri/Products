import Slider from "./components/Slider";
import Button from "./components/Button";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <div className="px-4 py-8 md:p-8">
      <Slider />
      <Button />
      <ProductList />
    </div>
  );
};

export default App;
