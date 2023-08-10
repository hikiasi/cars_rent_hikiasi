"use client";

import { useState } from "react";
import Image from "next/image";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import { CarDetails, CustomButton } from ".";
import { CarProps } from "@/types";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className="flex mt-6 text-[32px] font-extrabold">
        {carRent}
        <span className="self-end text-[18px] font-semibold">₽</span>
        <span className="self-end text-[18px] font-medium">/день</span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="Превью машины"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="Коробка передач"
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Автоматическая" : "Механика"}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="Привод" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="Топливо" />
            <p className="text-[14px]">
              {`${(100 / (city_mpg * 0.425144)).toFixed(2)} Л/100 км`}
            </p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="Подробее"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
