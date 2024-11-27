import { Text, View } from "react-native";

const HeaderAuth = ({ title, desc }: { title: string, desc: string}) => {
  return (
    <View className="pt-20 gap-2">
      <Text className="text-white text-center font-poppinsBold text-2xl">
        {title}
      </Text>
      <Text className="text-white text-center font-poppins text-sm">
        {desc}
      </Text>
    </View>
  );
};

export default HeaderAuth;
