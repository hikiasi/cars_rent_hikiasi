import { CarProps, FilterProps } from "@/types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const rublesPerDollar = 96; // Conversion rate from dollars to rubles
  const litersPerGallon = 3.78541; // Conversion rate from gallons to liters

  const basePricePerDay = 50 * rublesPerDollar; // Base rental price per day in dollars
  const mileageFactor = 1 * rublesPerDollar; // Additional rate per mile driven
  const ageFactor = 1 * rublesPerDollar; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = (city_mpg / litersPerGallon) * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);

  newSearchParams.delete(type.toLocaleLowerCase());

  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
    "X-RapidAPI-Key": "598c3922bamshb2a5ff5b06401cap1e7b6fjsn1b782c48500f",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  const result = await response.json();

  return result;
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL(`https://cdn.imagin.studio/getimage`);
  const { make, year, model } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};
