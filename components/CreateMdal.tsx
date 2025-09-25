import { validateTask } from "@/lib/form";
import { CustomToastProps, TaskProps } from "@/types/index.types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import FormInput from "./FormInput";

interface CreateModalProps {
  visible: boolean;
  onClose: () => void;
  tasks: TaskProps[];
  setToastProps: React.Dispatch<React.SetStateAction<CustomToastProps>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}

export default function CreateModal({
  visible,
  onClose,
  setTasks,
  tasks,
  setToastProps,
}: CreateModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<{
    name?: string;
    description?: string;
  } | null>({});

  const addTask = () => {
    const newTask = {
      name: name.trim(),
      description: description.trim(),
      completed: false,
    };
    const validationErrors = validateTask(newTask, tasks);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setTasks((prev) => [...prev, { ...newTask, completed: false }]);
    setError({});
    setName("");
    setDescription("");
    onClose();

    setTimeout(() => {
      setToastProps({
        visible: true,
        message: "🎉 Successfully created new task!",
      });
    }, 500);
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-11/12 rounded-2xl p-6 shadow-lg">
          <Text className="text-xl font-bold text-gray-900 mt-0 mb-6">
            Create Task
          </Text>

          <FormInput
            label="Task name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (error?.name)
                setError((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Enter task name"
            error={error?.name}
          />

          <FormInput
            label="Task description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (error?.description)
                setError((prev) => ({ ...prev, description: undefined }));
            }}
            placeholder="Enter task description"
            error={error?.description}
          />

          <TouchableOpacity
            onPressIn={addTask}
            className="bg-[#ffe678] rounded-lg py-4 my-3"
          >
            <Text className="text-gray-700 font-semibold text-center">
              Create task
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onClose();
              setDescription("");
              setName("");
              setError(null);
            }}
            className="absolute right-5 top-5"
            activeOpacity={1}
          >
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
