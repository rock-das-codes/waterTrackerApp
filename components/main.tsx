import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Alert, Modal, Pressable} from "react-native";
import { ScrollView } from "react-native";
import icons from "./../constants/icons"
import CupSizeModal from "./Model";
import { Canvas, Path } from "@shopify/react-native-skia";
import Animated, { withRepeat,Easing } from 'react-native-reanimated';
import { useSharedValue, useAnimatedStyle, withTiming ,useDerivedValue} from 'react-native-reanimated';
//storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import WaterIntakeModal from "./WaterModal";


 //storage
 const saveWaterData = async (drinkRecords) => {
  try {
    // let existingRecords = await getWaterData(); // Pehle purana data fetch karo
    // Naya record add karo
    await AsyncStorage.setItem("waterData", JSON.stringify(drinkRecords));
  } catch (error) {
    console.log("Error saving water data:", error);
  }
};



const clearWaterIntake = async () => {
  try {
    await AsyncStorage.removeItem('waterIntake');
  } catch (e) {
    console.log("Error clearing data", e);
  }
};


//main
const WaterReminderApp = () => {

  const drinkRecords1=[]
  const isFirstRender = useRef(true);
  const maxWater = 1800;
  const WIDTH = 200; // Canvas width
  
const HEIGHT = 200;
  const WAVE_HEIGHT = 10; // Wave height
  const waterLevel = useSharedValue(HEIGHT);
  const animatedPath = useDerivedValue(() => {
    const waveOffset = Math.sin(Date.now() / 300) * WAVE_HEIGHT; 
    return `M0,${waterLevel.value} 
            Q${WIDTH / 4},${waterLevel.value - WAVE_HEIGHT+waveOffset} 
            ${WIDTH / 2},${waterLevel.value+waveOffset} 
            T${WIDTH},${waterLevel.value+waveOffset} 
            L${WIDTH},${HEIGHT} 
            L0,${HEIGHT}Z`;
  });


  const [cupSizes, setCupSizes] = useState([
    { id: 1, size: 100 },
    { id: 2, size: 125 },
    { id: 3, size: 150 },
    { id: 4, size: 300 },
    { id: 5, size: 'customize' },
  ]);
  const [currentCupSize,setCurretCupSize]=useState(cupSizes[0].size)
  const [jol,setjol]=useState(0)
  const [modalVisible, setModalVisible] = useState(false);
  const [prevmodalVisible, setprevModalVisible] = useState(false);
 
    
  const [drinkRecords,setDrinkRecords] = useState(drinkRecords1)

  const handlePress = (id) => {
    Alert.alert(
      "Edit or Delete",
      "Do you want to edit or delete this record?",
      [
        { text: "Edit", onPress: () => console.log("Edit pressed", id) },
        { text: "Delete", onPress: () => deleteRecord(id), style: "destructive" },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };
 const updateLists= (cupsize,time)=>{
  if (jol + currentCupSize > maxWater) {
    Alert.alert("Limit Reached", "You have reached your daily water goal! 💧");
    
  }
  console.log(jol)
  const newDrinkRecord = { id: Date.now(), amount: cupsize?cupsize:currentCupSize, time:time?time: `${new Date().toLocaleTimeString()}`}
  const updatedRecords = [...drinkRecords, newDrinkRecord];
  console.log(updatedRecords)
  
  setDrinkRecords(updatedRecords)
 setjol((prev)=>(prev + currentCupSize));
  
  
  saveWaterData(updatedRecords)
 }
 const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
  }

  console.log('Done.')
}
  const  deleteRecord = async (id) => {
    const updatedRecords = drinkRecords.filter(record => record.id !== id);
    setjol(updatedRecords.reduce((acc, curr) => acc + curr.amount, 0));
    setDrinkRecords(updatedRecords);
    try {
      await saveWaterData(updatedRecords);
    } catch (error) {
      console.log("Error updating storage:", error);
    }
  };
  
  
  const getWaterData = async () => {
    try {
      const data = await AsyncStorage.getItem("waterData");
      // console.log(data);
      if(data != null){ 
        setDrinkRecords(JSON.parse(data))
        setjol(JSON.parse(data).reduce((acc, curr) => acc + curr.amount, 0))
        console.log("drink",drinkRecords);
        
        console.log("jol",drinkRecords.reduce((acc, curr) => acc + curr.amount, 0));
        
        
      };
    } catch (error) {
      console.log("Error retrieving water data:", error);
      return [];
    }
  };
  const getCupData = async () => {
    try {
      const value = await AsyncStorage.getItem('cupSize');
      if(value != null){ 
        setCupSizes(JSON.parse(value))
        
      };
  
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getWaterData()
      
    
    getCupData()
    // removeValue("waterData")
    
  }, []);
  useEffect(() => {
    
    if (drinkRecords.length > 0) {  // Ensure drinkRecords has valid data before calculating jol
      setjol(drinkRecords.reduce((acc, curr) => acc + curr.amount, 0));
      waterLevel.value = withTiming(
        HEIGHT - (jol / maxWater) * HEIGHT, 
        { duration: 2000, easing: Easing.inOut(Easing.ease) }
      );
    }
    
  }, [drinkRecords]);


 
  return (
    <View className=" h-screen w-[80%] flex justify-center ">

      <Text className="text-xl absolute top-20" >
        Stay Hydrated! Your body needs water to keep going! 💧
      </Text>

     
       <View className=" flex justify-center items-center">
     
        <View className="bg-blue-300 shadow-lg shadow-blue-500  h-56 w-56 overflow-hidden flex items-center justify-center rounded-full">
        <Text className="text-4xl text-white absolute z-[2]">{jol + "/" + maxWater}</Text>

        <View className="bg-blue-300 shadow-lg shadow-blue-500 h-56 w-56 rounded-full overflow-hidden relative">
          
        <Canvas style={{ width: WIDTH, height: HEIGHT }}>
        <Path path={animatedPath} color="blue" />
      </Canvas>
      </View>
        </View>
        <TouchableOpacity onPress={()=>{ updateLists()}}  className="h-12 w-12 rounded-full relative bottom-10 bg-white"
          
        >
          <Text className="text-4xl mt-2 text-center">+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setModalVisible(true)}} className="h-12 w-12 items-center justify-center relative rounded-full  left-20 bottom-10 bg-white"
          
        >
          <Image className="w-6 h-6 " source={icons.cup} resizeMode="contain"/>
        </TouchableOpacity>
      </View>

     <View className="flex-row ">
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#004AAD", marginBottom: 10 }}>Today's Record</Text>
      <Pressable onPress={()=>{setprevModalVisible(true)}}><Text className="text-2xl pl-2 mb-2 text-center">+</Text></Pressable></View>
      <View className=" h-1/3">
    <ScrollView>
      {drinkRecords.length > 0 ?drinkRecords.map((item,index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(item.id)}>
            {item.time?
            <View style={{ backgroundColor: "#E3F2FD", padding: 10, borderRadius: 10, marginBottom: 8 }}>
              <Text style={{ color: "#1B365D" }}>{item.amount + "ml"} - {item.time.substring(0,5)+ item.time.substring(8,11)}</Text>
            </View>:null}
          </TouchableOpacity>
        )):<Text style={{ color: "gray", textAlign: "center" }}>No water intake recorded today</Text>}
        </ScrollView></View>
      <CupSizeModal size={cupSizes} cupSizes={cupSizes} currentCupSize={currentCupSize} modalVisible={modalVisible} setModalVisible={setModalVisible} setCupSizes={setCupSizes} setCurrentCupSize={setCurretCupSize}/>
     <WaterIntakeModal update={updateLists} prevmodalVisible={prevmodalVisible} setprevModalVisible={setprevModalVisible}/>
         
    </View>
    
  );
};

export default WaterReminderApp;



