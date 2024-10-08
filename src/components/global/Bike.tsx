import { FaBiking } from "react-icons/fa";
import { FaRoad, FaStar } from "react-icons/fa6";
import { RiSteeringFill } from "react-icons/ri";
import { Button } from "../utils/Button";

interface bikeProps {
  bike: Bike;
  admin: boolean;
}
export const Bike: React.FC<bikeProps> = ({ bike, admin = false }) => {
  const {id, name, rating, image, features, price } = bike;

  return (
    <div
      className={`p-4 max-w-md group transition-all ease-in duration-300 hover:-translate-y-3 bg-gradient-to-br from-pink-100 to-blue-50 rounded-xl shadow-sm shadow-gray-300`}
    >
      <div className={`relative rounded-xl w-full  ${admin?"":"h-60"} overflow-hidden`}>
        <img
          src={image}
          alt="bike"
          className={`w-full ${admin?"":"h-60"} rounded-xl group-hover:scale-110 transition-all ease-linear duration-300  object-cover`}
        />
      </div>

      <div className="flex justify-between items-center my-2 ">
        <h1 className={` ${admin?"":"text-xl"} font-bold capitalize`}>{name}</h1>
        <span className="flex items-center gap-1">
          <FaStar className="inline-block text-primary pb-0.5" />
          <span className="text-sm font-medium">{rating}</span>
        </span>
      </div>
      <div className={`flex flex-wrap gap-4 mt-4 text-gray-600 font-medium ${admin?"text-xs":""}  `}>
        <span className="flex items-center gap-2">
          <FaBiking className="text-primary" />
          <span className="uppercase">{features.start}</span>
        </span>
        <span className="flex items-center gap-2">
          <RiSteeringFill className="text-primary" />
          <span className="uppercase">{features.engine}</span>
        </span>
        <span className="flex items-center gap-2">
          <FaRoad className="text-primary" />
          <span>{features.distance}</span>
        </span>
      </div>
      <div className="flex items-center justify-between my-3  border-t border-neutral-400 pt-2">
        <h2 className="flex items-center">
          <span className={`${admin?"text-sm":"text-xl "}font-bold text-primary`}>रु {price}</span>
          <span className="text-xs text-gray-500 font-semibold">/day</span>
        </h2>
        {admin ? (
          <Button title="Edit" path={`/admin/bikes/${id}`} className="text-white  " />
        ) : (
          <Button title="Rent Now" className=" text-white" />
        )}
      </div>
    </div>
  );
};
