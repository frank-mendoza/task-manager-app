import { CustomToastProps, TaskProps } from "@/types/index.types";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";

const RenderItem = ({
  item,
  setToastProps,
  setSelectedTask,
}: {
  item: TaskProps;
  setToastProps: React.Dispatch<React.SetStateAction<CustomToastProps>>;
  setSelectedTask: React.Dispatch<TaskProps>;
}) => {
  const handleCheckboxChange = (newValue: boolean) => {
    item.completed = newValue;

    if (newValue) {
      setToastProps({
        message: `🎉 ${item.name} marked complete!`,
        visible: true,
      });
    } else {
      setToastProps({
        message: `🎉 ${item.name} marked incomplete!`,
        visible: true,
      });
    }
  };

  return (
    <View className=" flex-row items-center bg-white px-4 py-5 gap-3 rounded-2xl shadow-sm">
      {/* Checkbox with Alert */}
      <Checkbox
        value={item.completed}
        onValueChange={(e) => handleCheckboxChange(e)}
        style={{ marginRight: 12, width: 24, height: 24, borderRadius: 6 }}
      />

      {/* Info */}
      <View className="flex-1">
        <Text
          className={`font-medium ${
            item.completed ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {item.name}
        </Text>
        <Text
          className={`${
            item.completed ? "line-through text-gray-400 " : "text-gray-500"
          }  text-sm mt-3`}
        >
          {item.description}
        </Text>
      </View>

      {/* Chevron */}
      <TouchableOpacity onPress={() => setSelectedTask(item)} className="pl-6">
        <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
};

export default RenderItem;
