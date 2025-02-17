import { View, Text, Image, ImageSourcePropType } from "react-native"
import { Tabs, Redirect } from "expo-router"
import { colorScheme } from "nativewind"
import { icons } from '../../constants'
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs"
import React from "react"
interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}
const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
    return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center',gap:5}} >
            <Image source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6 " />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs `} style={{color:color}}>{name}</Text>
        </View>
    )
}
const TabsLayout: React.FC  = () => {
    return (
        <>
        
            <Tabs screenOptions={{ tabBarShowLabel: false,
                tabBarActiveTintColor:'#FFA001',
                tabBarInactiveTintColor:'#CDCDE0',
                tabBarStyle:{
                    position:'absolute',
                    bottom:50,
                    justifyContent:'space-between',
                    backgroundColor:'#161622',
                    borderTopWidth:1,
                    borderTopColor:'#232533', 
                    height:64,
                    alignItems:'center',
                    marginHorizontal:80,
                    borderRadius:35,
                    paddingVertical:15,
                    shadowColor:"#000",
                    shadowOffset:{width:0,height:10},
                    shadowRadius:10,
                    shadowOpacity:0.1


                }
             }}>
                <Tabs.Screen name="home"
                
                    options={
                        {
                            title: "Home",
                            headerShown: false,
                            tabBarIconStyle:{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                width:'50px'
                                
                            },
                            tabBarIcon: ({ color, focused }) => (
                                <TabIcon
                                    icon={icons.home}
                                    color={color}
                                    name='Home'
                                    focused={focused}
                                />
                            )
                        }
                    } 
                      />
                    <Tabs.Screen name="bookmark"
                    options={
                        {
                            title: "bookmark",
                            headerShown: false,
                            tabBarIconStyle:{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                width:'50px'
                                
                            },
                            tabBarIcon: ({ color, focused }) => (
                                <TabIcon 
                                    icon={icons.bookmark}
                                    color={color}
                                    name='bookmark'
                                    focused={focused}
                                />
                            )
                        }
                    } />
                    <Tabs.Screen name="profile"
                    options={
                        {
                            title: "Profile",
                            headerShown: false,
                            tabBarIconStyle:{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                width:'50px'
                                
                            },
                            tabBarIcon: ({ color, focused }) => (
                                <TabIcon
                                    icon={icons.profile}
                                    color={color}
                                    name='Profile'
                                    focused={focused}
                                />
                            )
                        }
                    } />
            </Tabs>
        </>
    )
}
export default TabsLayout