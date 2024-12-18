import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface DataNotFoundProps {
  title: string;
  subTitle: string;
  onPress: () => void;
  buttonTitle: string;
}

const DataNotFound: React.FC<DataNotFoundProps> = ({
  title,
  subTitle,
  onPress,
  buttonTitle
}) => {
  return (
    <View className="items-center mt-8 gap-8">
      <Image
        source={require("@/assets/images/box.png")}
        style={{ width: 244, height: 190 }}
      />

      <View className="gap-2">
        <View>
          <Text className="text-center font-poppinsBold text-white text-lg">
            Uh Oh!
          </Text>
          <Text className="text-center font-poppinsBold text-white text-lg">
            {title}
          </Text>
        </View>
        <Text className="text-center font-poppins text-white/50">
          {subTitle}
        </Text>
      </View>

      <LinearGradient
        colors={["#00B553", "#004F24"]}
        start={[0, 0]}
        end={[1, 0]}
        className="h-14 justify-center rounded-full overflow-hidden w-full"
      >
        <TouchableOpacity onPress={onPress}>
          <Text className="text-white text-lg font-poppinsSemibold min-w-64 px-8 text-center">
            {buttonTitle}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default DataNotFound;
