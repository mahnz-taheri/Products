import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages } from "../features/sliderSlice";

const Slider = () => {
  const dispatch = useDispatch();
  const { images, status, error } = useSelector((state) => state.slider);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchImages());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-between items-center space-x-2 w-full">
      {/* display one image on mobile and three images on medium and larger screens */}
      {images.slice(0, 3).map((image, index) => (
        <div
          key={index}
          className={`flex-shrink-0 ${
            index === 0
              ? "w-full h-64 md:w-[25%] md:h-auto"
              : "hidden sm:block sm:w-1/2"
          } md:w-[25%]`}
        >
          <img
            src={image}
            alt={`Slide ${index}`}
            className="object-contain w-full h-full md:h-[250px]"
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;
