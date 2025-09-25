import { CustomToastProps } from "@/types/index.types";
import { useEffect } from "react";
import { Animated, Text } from "react-native";

type Props = {
  toastProps: CustomToastProps;
  onHide: () => void;
};

export default function CustomToast({ toastProps, onHide }: Props) {
  const { visible, message } = toastProps;
  useEffect(() => {
    if (visible) {
      // Auto-hide after 2s
      const timer = setTimeout(() => {
        onHide();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 10,
        alignSelf: "center",
        backgroundColor: "#edffc3",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        zIndex: 999,
      }}
    >
      <Text
        style={{
          color: "black",
          fontWeight: "600",
        }}
      >
        {message}
      </Text>
    </Animated.View>
  );
}
