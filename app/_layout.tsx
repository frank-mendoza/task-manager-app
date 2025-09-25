import LoadingIndicator from "@/components/LoadingIndicator";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [loadingIndicatorVisible, setLoadingIndicatorVisible] = useState(true);

  // useEffect(() => {
  //   NavigationBar.setButtonStyleAsync("light");
  // }, []);

  if (loadingIndicatorVisible)
    return <LoadingIndicator setLoading={setLoadingIndicatorVisible} />;

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <StatusBar backgroundColor={"#ffe678"} barStyle="dark-content" />
        <Tabs
          screenOptions={{
            // headerShown: false,
            headerTitle: "",
            headerLeft: () => (
              <View className="flex-row mt-3 items-center justify-start">
                <Image
                  source={images.logo as any}
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: "contain",
                  }}
                />
                <Text className="text-xl m-[-10px] font-semibold text-[#252525]">
                  Task Manager
                </Text>
              </View>
            ),

            tabBarStyle: {
              display: "none",
            },
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: "#ffe678",
              height: 90 + insets.top,
            },
          }}
        >
          <Tabs.Screen name="index" options={{ headerTitle: "" }} />
          <Tabs.Screen
            name="task-details/[id]"
            options={{
              headerTitle: "",
            }}
          />
          <Tabs.Screen
            name="create-task"
            options={{
              headerTitle: "",
            }}
          />
        </Tabs>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
