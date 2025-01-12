"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import BikeServices from "../services/BikeServices";
import Loading from "@/components/utils/Loading";
import { BikeComponent } from "@/components/global/Bike";
import { Bike, BikeListResponse } from "../types/bikeApiTypes";
import { useBikeStore } from "@/store/bikeStore";
import Notfound from "@/components/global/Notfound";
import { useSearchParams } from "next/navigation";
import LocationService from "@/services/LocationService";
import { LocationListResponse } from "@/types/locationType";
import Link from "next/link";
import { useNavigate } from "@/hooks/navigate";
import { LuX } from "react-icons/lu";

const BikeList = () => {
  const { goTo } = useNavigate();
  const query = useSearchParams();
  const locationId = query.get("locationId") || "";
  const { searchQuery, bikes, setBikes, isLoading, setIsLoading } =
    useBikeStore((state) => ({
      searchQuery: state.searchQuery,
      bikes: state.bikes,
      setBikes: state.setBikes,
      isLoading: state.isLoading,
      setIsLoading: state.setIsLoading,
    }));

  const { data, isLoading: bikeLoading } = useQuery<BikeListResponse>({
    queryFn: async () => await BikeServices.getBikeList(),
    queryKey: ["get-bike-list"],
    select: (res) => res,
  });
  const { data: BikesOnLocations, isLoading: bikeListLoading } =
    useQuery<BikeListResponse>({
      queryFn: async () => await BikeServices.getBikeByLocation(locationId),
      queryKey: ["get-bike-on-location", locationId],
      select: (res) => res,
      enabled: !!locationId,
    });
  const { data: LocationData } = useQuery<LocationListResponse>({
    queryFn: async () => await LocationService.getLocationById(locationId),
    queryKey: ["get-location-by-id", locationId],
    select: (res) => res,
    enabled: !!locationId,
  });

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(async () => {
        const response = await BikeServices.searchBikes(searchQuery);
        setBikes(response);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else if (locationId && BikesOnLocations) {
      setBikes(BikesOnLocations);
      setIsLoading(bikeListLoading);
    } else {
      if (data) {
        setBikes(data);
        setIsLoading(bikeLoading);
      }
    }
  }, [searchQuery, data, bikeLoading]);
  const handleClick = () => {
    goTo("/bike-on-rent");
    if (data) {
      setBikes(data);
      setIsLoading(bikeLoading);
    }
  };
  return (
    <div className="">
      {locationId && BikesOnLocations && LocationData && !searchQuery && (
        <div className="flex p-4 justify-between items-center">
          <h2 className=" font-semibold">
            {BikesOnLocations?.length} Bikes found in this Pickup location{" "}
            {LocationData.city}{" "}
          </h2>
          <button
            onClick={handleClick}
            className="text-gray-800 hover:text-red-500 border border-gray-300 hover:border-red-400   rounded-md"
          >
            <LuX />
          </button>
        </div>
      )}
      {isLoading || bikeLoading || bikeListLoading ? (
        <div className="h-32 flex justify-center items-center  mt-12 ">
          <Loading className="text-7xl text-gray-600 !important" />
        </div>
      ) : (
        <div className="grid place-items-center md:grid-cols-2 xl:grid-cols-3 py-6 gap-4">
          {bikes?.length > 0 ? (
            bikes?.map((bike: Bike) => (
              <div key={bike.id + bike.image}>
                <BikeComponent bike={bike} />
              </div>
            ))
          ) : (
            <div className="col-span-3 w-full flex justify-center ">
              <Notfound msg="Sorry, no bikes found matching your search. Please try different keywords or adjust your filters." />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BikeList;
