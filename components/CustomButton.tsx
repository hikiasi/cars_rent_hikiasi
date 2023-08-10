"use client";
import Image from "next/image";
import { CustomButtonProps } from "@/types";

export const CustomButton = ({
  isDisabled,
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
}: CustomButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="стрелочка"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};
