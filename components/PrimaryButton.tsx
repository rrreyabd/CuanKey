import { ButtonProps } from "@/data/types";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { TouchableOpacity, Text } from "react-native";

const PrimaryButton: FC<ButtonProps> = ({
  title,
  onPress,
  className,
  textClassName,
  disabled
}) => {
  return (
    <>
      <LinearGradient
        colors={disabled ? ["#858e96", "#60696b"] : ["#00B553", "#004F24"]}
        start={[0, 0]}
        end={[1, 0]}
        className={`${className} h-14 justify-center rounded-xl overflow-hidden`}
      >
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <Text
            className={`text-white text-lg font-poppinsSemibold  text-center ${textClassName}`}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

export default PrimaryButton;
