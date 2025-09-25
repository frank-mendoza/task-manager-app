import { images } from "@/constants/images";
import { useEffect } from "react";
import { Image, StatusBar, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const LoadingIndicator = ({ setLoading }: { setLoading: any }) => {
  const scale = useSharedValue(1);
  useEffect(() => {
    // setLoading(true);
    const timer = setTimeout(() => {
      // 👇 start zoom-out
      scale.value = withTiming(5, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });

      // 👇 wait for animation to finish, then hide loader
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: 1 - (scale.value - 1) / 4,
  }));

  return (
    <>
      <StatusBar backgroundColor={"#ffe678"} barStyle="dark-content" />
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <View className="h-full  flex justify-center items-center bg-[#ffe678]">
          <Image
            source={images.logo as any}
            style={{
              width: 150,
              height: 150,
              marginTop: 10,
              resizeMode: "contain",
            }}
          />
        </View>
      </Animated.View>
    </>
  );
};
export default LoadingIndicator;
