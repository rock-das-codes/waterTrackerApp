import React, { useState } from 'react';
import { Modal, View, Text, Pressable , Image, TextInput} from 'react-native';
import icons from "./../constants/icons"
import AsyncStorage from '@react-native-async-storage/async-storage';


const CupSizeModal = ({ modalVisible, setModalVisible,setCupSizes,cupSizes , size, setCurrentCupSize,currentCupSize}) => {
  const [minimodal, setminimodal] = useState(false);
  const [val,setval]=useState('')
  const storeCupData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('cupSize', jsonValue);
    } catch (e) {
      console.log(e);
      
    }
  };
  const getCupData = async () => {
    try {
      const value = await AsyncStorage.getItem('cupSize');
      return value != null ? JSON.parse(value) : null;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-80 bg-white rounded-2xl p-4 shadow-lg relative">
          {/* Title */}
          <Text className="text-lg font-bold text-center mb-4">Choose Cup Size</Text>

          {/* Circular Dialer Style Icons */}
          <View className="  flex-row flex-wrap ">
            {[
    ...size.filter(sizes => sizes.size !== "customize"), // Normal sizes first
    ...size.filter(sizes => sizes.size === "customize")  // Customize at the end
  ].map((sizes, index) => (
              <View key={index} className=' flex justify-center items-center w-1/3 '>
    <Pressable 
      
      className={`h-14 w-14 border ${
    currentCupSize === sizes.size ? "border-red-500" : "border-black"
  } rounded-full  items-center justify-center m-2`}
      onPress={
        ()=>{
         if(index!=size.length-1){setCurrentCupSize(sizes.size)}
         else{setminimodal(true);
         } ;
      }}
    >
      <Image source={icons.cup} className="h-8 w-8" />
      
    </Pressable>
    <Text className="text-sm">
        {typeof sizes.size !== "number" ? "customize" : `${sizes.size}ml`}
      </Text>

   </View>
  ))}</View>
  


          {/* Footer Buttons Positioned at Edges */}
          <View className='flex-row justify-between'>
          <View className="">
            <Pressable
              className="py-2  px-4 bg-white rounded-lg border border-red-500"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-red-500">Cancel</Text>
            </Pressable>
          </View>
          <View className="">
            <Pressable
              className="py-2 px-4 bg-white rounded-lg border border-blue-500"
              onPress={() => {setModalVisible(false); storeCupData(cupSizes);
              }}
            >
              <Text className="text-blue-500">OK</Text>
            </Pressable>
          </View>
          </View>
        </View>
      </View>
      <Modal animationType="fade"
      transparent={true}
      visible={minimodal}
      onRequestClose={() => setModalVisible(false)}><View className="flex-1 justify-center items-center mt-12 bg-black/50"><View className="w-72 bg-white rounded-2xl p-4 shadow-lg relative">
      <Text className='font-bold text-lg'>Customize</Text>
      <View className='border rounded-xl mt-4 flex flex-row items-center   border-black'><TextInput className='px-4 pl-8   w-3/5' placeholder='size of cup' onChange={(e)=>{setval(e.nativeEvent.text);console.log(val);
      }} keyboardType='numeric'/><Text>ml</Text></View>
      <View className='flex flex-row justify-between '><Pressable
              className="mt-4 py-2 px-4 w-24 bg-white rounded-lg border border-red-500"
              onPress={() => setminimodal(false)}
            >
              <Text className="text-red-500 text-center">Cancel</Text>
            </Pressable>
      <Pressable className=" mt-4 py-2 px-4 w-24  bg-white rounded-lg border border-blue-500" onPress={()=>{ if (!isNaN(val) && Number(val) > 0) {  // Ensure valid number
    const newItem = { id: Date.now(), size: Number(val) };
    setCurrentCupSize(Number(val));  // Set new size as selected
    setCupSizes(prev => [...prev, newItem]); // Correct way to update state
    setminimodal(false);
    setval("")
  } else {
    alert("Enter a valid number!");
  }}}><Text className='text-center'>Done</Text></Pressable></View>
      
      </View></View></Modal>
    </Modal>
  );
};

export default CupSizeModal;
