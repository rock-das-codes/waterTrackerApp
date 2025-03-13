import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { images } from "../constants";
import WaterReminderApp from "@/components/main";
// import { CustomButton, Loader } from "../components";
// import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
//   const { loading, isLogged } = useGlobalContext();

//   if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full flex items-center ">
      
    <WaterReminderApp/>
    </SafeAreaView>
  );
};

export default Welcome;