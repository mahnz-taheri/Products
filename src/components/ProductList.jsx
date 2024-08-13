import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchProductById,
  replaceProduct,
} from "../features/sliderSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.slider.products);
  const usedProductIds = useSelector((state) => state.slider.usedProductIds);

  useEffect(() => {
    // fetch products if they haven't been loaded yet
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const handleProductClick = async (index) => {
    let newProduct = null;
    let randomId;

    do {
      randomId = Math.floor(Math.random() * 20) + 1; // (there are 20 products)
    } while (usedProductIds.includes(randomId)); // checking if the id is already used

    try {
      // now we can fetch new product
      newProduct = await dispatch(fetchProductById(randomId)).unwrap();
      dispatch(replaceProduct({ index, product: newProduct }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {products.map((product, index) => (
        <div
          key={product.id}
          className="flex flex-col items-center shadow-lg shadow-gray-400 rounded-lg my-16 p-3"
          onClick={() => handleProductClick(index)}
        >
          <img className="w-[40%]" src={product.image} alt={product.title} />
          <h3 className="font-bold my-2">{product.title}</h3>
          <h6 className="text-gray-600 mb">{product.category}</h6>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
