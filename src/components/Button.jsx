import { useDispatch } from "react-redux";
import { nextSlide } from "../features/sliderSlice";

const Button = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center">
      <button
        onClick={() => dispatch(nextSlide())}
        className="my-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
      >
        Next Image
      </button>
    </div>
  );
};

export default Button;
