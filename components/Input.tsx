import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { FC } from "react";
import { TextInputProps } from "@/data/types";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Input: FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  className,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="gap-2">
        <Text className="text-subText text-sm font-poppinsSemibold">
          {label}
        </Text>
        <TextInput
          placeholder={placeholder}
          className={`text-white font-poppins bg-charcoalGray w-full py-4 px-8 rounded-md ${className} placeholder:font-poppinsSemibold placeholder:text-subText`}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Input;
