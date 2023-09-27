import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AboutScreen from "../screens/about";
import { FontAwesome } from "@expo/vector-icons"; // Import the icon library you're using
import ChatBot from "../../hook/GetResponse";
import Home from "../screens/home";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Chat") {
            iconName = focused ? "comment" : "comment";
          } else if (route.name === "About") {
            iconName = focused ? "info" : "info";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Chat" component={ChatBot} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
