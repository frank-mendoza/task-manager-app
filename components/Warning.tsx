import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function Warning({
  visible,
  onClose,
  message,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  message: string;
  onSubmit: () => void;
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-11/12 rounded-2xl p-6 shadow-lg">
          <Text className="font-semibold text-2xl">Warning</Text>
          <Text className=" text-lg my-8">{message}</Text>

          <View className="flex-row justify-between items-center gap-4">
            <TouchableOpacity onPress={onClose} className="rounded-lg py-4">
              <Text className="font-semibold text-center">Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSubmit}
              className={`bg-red-500 rounded-lg p-4`}
            >
              <Text className="text-white font-semibold text-center">
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
