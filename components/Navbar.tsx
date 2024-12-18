import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { usePathname, useRouter } from "expo-router";
import "../global.css";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Navbar = ({ className }: { className?: string }) => {
  const router = useRouter();
  const currentRoute = usePathname();


  return (
      <View
        className={`bg-deepCharcoal absolute bottom-0 left-0 right-0 z-0 h-24 px-4 ${className}`}
      >
        <View className="h-full flex-row justify-between">
          {/* Home */}
          <View className="w-2/12 pb-6 justify-end items-center">
            <Pressable onPress={() => router.replace("/")} disabled={currentRoute === "/"} >
              <View className="items-center">
                <FontAwesome
                  name="home"
                  size={24}
                  style={currentRoute === "/" ? styles.active : styles.icon}
                />
                <Text
                  className={`${
                    currentRoute === "/" ? "text-vividGreen" : "text-[#7D7D7D]"
                  } font-poppins text-sm text-center`}
                >
                  Home
                </Text>
              </View>
            </Pressable>
          </View>

          {/* History */}
          <View className="w-2/12 pb-6 justify-end items-center">
            <Pressable onPress={() => router.replace("/history/History")} disabled={currentRoute === "/history/History"}>
              <View className="items-center">
                <FontAwesome
                  name="history"
                  size={24}
                  style={currentRoute === "/history/History" ? styles.active : styles.icon}
                />
                <Text
                  className={`${
                    currentRoute === "/history/History" ? "text-vividGreen" : "text-[#7D7D7D]"
                  } font-poppins text-sm text-center`}
                >
                  History
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Transaction */}
          <View className="w-3/12 h-full">
            <TouchableOpacity
              onPress={() => router.push("/transactions/Transaction")}
            >
              <View className="h-full relative items-center w-full">
                <View className="absolute -top-6 justify-center items-center gap-2">
                  <View className="w-16 aspect-square rounded-full overflow-hidden">
                    <AnimatedLinearGradient
                      colors={["#00B553", "#077c3f"]}
                      className="w-16 aspect-square justify-center items-center"
                    >
                      <FontAwesome5 name="plus" size={30} color="white" />
                    </AnimatedLinearGradient>
                  </View>
                  <Text
                    className={`${
                      currentRoute === "" ? "text-vividGreen" : "text-[#7D7D7D]"
                    } font-poppins text-sm text-center`}
                  >
                    Transaction
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Budget */}
          <View className="w-2/12 pb-6 justify-end items-center">
            <Pressable onPress={() => router.replace("/budget/Budget")} disabled={currentRoute === "/budget/Budget"}>
              <View className="items-center">
                <FontAwesome5
                  name="piggy-bank"
                  size={22}
                  style={currentRoute === "/budget/Budget" ? styles.active : styles.icon}
                />
                <Text
                  className={`${
                    currentRoute === "/budget/Budget" ? "text-vividGreen" : "text-[#7D7D7D]"
                  } font-poppins text-sm text-center`}
                >
                  Budget
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Account */}
          <View className="w-2/12 pb-6 justify-end items-center">
            <Pressable onPress={() => router.replace("/profile/Profile")} disabled={currentRoute === "/profile/Profile"}>
              <View className="items-center">
                <FontAwesome
                  name="user"
                  size={24}
                  style={
                    currentRoute === "/profile/Profile"
                      ? styles.active
                      : styles.icon
                  }
                />
                <Text
                  className={`${
                    currentRoute === "/profile/Profile"
                      ? "text-vividGreen"
                      : "text-[#7D7D7D]"
                  } font-poppins text-sm text-center`}
                >
                  Account
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  icon: {
    color: "#7D7D7D",
  },
  active: {
    color: "#00B553",
  },
});
