import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Navbar from '@/components/Navbar';

const Budget = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const handleOpenBottomSheet = () => {
    setIsNavbarVisible(false);
    bottomSheetRef.current?.expand();
  };

  const handleCloseBottomSheet = () => {
    setIsNavbarVisible(true);
  };

  return (
    <>
      <View className="flex-1 bg-black">
        {isNavbarVisible && <Navbar className="" />}

        <View className="justify-center items-center flex-1">
          <TouchableOpacity style={styles.button} onPress={handleOpenBottomSheet}>
            <Text style={styles.buttonText}>Open Bottom Sheet</Text>
          </TouchableOpacity>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          handleIndicatorStyle={{ backgroundColor: 'black' }} // Change the color here
          onClose={handleCloseBottomSheet} // Add this line
        >
          <BottomSheetView className="bg-deepCharcoal justify-center items-center flex-1">
            <Text className="text-white">Transaction Details</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Budget;