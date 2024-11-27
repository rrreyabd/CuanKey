import { AuthTextInputProps } from "@/data/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TextInput, View } from "react-native";

const AuthTextInput: React.FC<AuthTextInputProps> = ({ placeholder, icon, value, onChangeText }) => {
  return (
    <View className="bg-charcoalGray h-16 items-center rounded-xl flex-row border border-[#525B69] w-full">
      <View className="pl-8 w-2/12">
        <FontAwesome name={icon} size={20} color="white" />
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderClassName="text-white"
        placeholderTextColor={"#8D8D8D"}
        className="w-10/12 pl-4 text-white font-poppinsSemibold"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default AuthTextInput;