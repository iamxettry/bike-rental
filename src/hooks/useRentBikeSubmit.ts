import RentBikeServices from "@/services/RentBikeServices";
import { AxiosError } from "axios";
import { SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "./navigate";
import {
  BikeRentFormSchemaType,
  RentalResponse,
} from "@/BikeRent/types/BikeRentFormSchema";

const useRentBikeSubmit = () => {
  const { goTo } = useNavigate();
  const { handleSubmit, setValue, formState, watch } =
    useFormContext<BikeRentFormSchemaType>();
  const onSubmit: SubmitHandler<BikeRentFormSchemaType> = async (data) => {
    const newPromise: Promise<RentalResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await RentBikeServices.rentBike(data);
          resolve(response);
        } catch (error) {
          if (error instanceof AxiosError) {
            let errMsg = "";
            if (error.response?.data) {
              errMsg = error.response.data.detail || error.response.data.error;
            }
            reject(errMsg);
          } else if (error instanceof Error) {
            reject(error.message);
          } else {
            reject("Failed to find bikes");
          }
        }
      }
    );
    await toast.promise(newPromise, {
      loading: "Renting bike...",
      success: (d) => {
        goTo(`/bike/rent/${data?.bike}/${d.id}`);
        return "Bike rented successfully";
      },
      error: (err) => err || "Failed to rent bike",
    });
  };
  return {
    handleSubmit: handleSubmit(onSubmit),
    formState,
    setValue,
    watch,
  };
};

export default useRentBikeSubmit;
