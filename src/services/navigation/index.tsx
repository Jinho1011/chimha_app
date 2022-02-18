import React from "react";
import { useColorScheme, View } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { palette } from "@theme/themes";
import { LightTheme, DarkTheme } from "@theme/themes";
// ? Screens
import YoutubeScreen from "@screens/youtube/YoutubeScreen";
import TwitchScreen from "@screens/twitch/TwitchScreen";
import WebtoonScreen from "@screens/webtoon/WebtoonScreen";
import CafeScreen from "@screens/cafe/CafeScreen";
import StoreScreen from "@screens/store/StoreScreen";
/**
 * ? Shared Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import fonts from "@fonts";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName: string = "home";
    switch (route.name) {
      case SCREENS.YOUTUBE:
        iconName = focused ? "home" : "home-outline";
        break;
      case SCREENS.TWITCH:
        iconName = focused ? "search" : "search-outline";
        break;
      case SCREENS.WEBTOON:
        iconName = focused ? "notifications" : "notifications-outline";
        break;
      case SCREENS.CAFE:
        iconName = focused ? "person" : "person-outline";
        break;
      case SCREENS.STORE:
        iconName = focused ? "logo-youtube" : "logo-youtube";
        break;
    }
    return <Icon name={iconName} type="Ionicons" size={size} color={color} />;
  };

  const renderHeader = () => {
    return (
      <Text
        fontFamily={fonts.tmon.black}
        color={isDarkMode ? palette.white : palette.black}
        h3
      >
        CHIMHA
      </Text>
    );
  };

  const renderTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerTitle: () => renderHeader(),
          headerStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
          },
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarShowLabel: false,
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
            borderTopWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -5,
            },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            height: 90,
          },
        })}
      >
        <Tab.Screen name={SCREENS.YOUTUBE} component={YoutubeScreen} />
        <Tab.Screen name={SCREENS.TWITCH} component={TwitchScreen} />
        <Tab.Screen name={SCREENS.WEBTOON} component={WebtoonScreen} />
        <Tab.Screen name={SCREENS.CAFE} component={CafeScreen} />
        <Tab.Screen name={SCREENS.STORE} component={StoreScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={renderTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
