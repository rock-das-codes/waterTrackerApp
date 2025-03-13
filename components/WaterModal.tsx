import React, { useState, useRef } from "react";
import { Modal, View, Text, Pressable, FlatList,Button, TextInput } from "react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';



const WaterIntakeModal = ({ prevmodalVisible, setprevModalVisible,update }) => {
  const [time, setTime] = useState(new Date());
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <Modal animationType="fade" transparent={true} visible={prevmodalVisible} onRequestClose={() => setprevModalVisible(false)}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-80 bg-white rounded-2xl p-4 shadow-lg relative">
          <Text className="font-bold text-lg">Record your previously missed intake</Text>

          {/* Time Picker */}
          <View className="flex flex-row items-center mt-4 justify-center">
            <View className="flex w-40 h-24 justify-center items-center ">
           
      <Pressable onPress={showTimepicker}><Text className="text-blue-300 ">Set Time</Text></Pressable>
      <Text>{date.toLocaleTimeString().substring(0,5)+date.toLocaleTimeString().substring(8,11)}</Text>
            </View>
            <View className="flex w-40 h-24 flex-row items-center justify-center">
              <TextInput
              className="border-b w-12 text-center border-blue-300 p-0"
              onChangeText={(text) => setQuantity(Number(text))}
              keyboardType="numeric"
              />
              <Text>ml</Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="flex flex-row justify-between mt-4">
            <Pressable className="py-2 px-4 w-24 bg-white rounded-lg border border-red-500" onPress={() => setprevModalVisible(false)}>
              <Text className="text-red-500 text-center">Cancel</Text>
            </Pressable>
            <Pressable
              className="py-2 px-4 w-24 bg-white rounded-lg border border-blue-500"
              onPress={()=>{setprevModalVisible(false),update(quantity,date.toLocaleTimeString())}}
            >
              <Text className="text-blue-500 text-center">Done</Text>
            </Pressable>
          </View>
          
        </View>
      </View>
    </Modal>
  );
};

export default WaterIntakeModal;
