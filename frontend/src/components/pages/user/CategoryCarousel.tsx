import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/toolkitHooks";
import { Button } from "../../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { setSearchQuery } from "../../../store/slices/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Since",
  "ui&ux Designer",
];

const CategoryCarousel = () => {
  const
    dispatch = useAppDispatch(),
    navigate = useNavigate()

  const searchJobHandler = (query: string) => {
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselNext />
        <CarouselContent>
          {category.map((cat, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <Button onClick={() => searchJobHandler(cat)} variant={"outline"} className="rounded-full">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
