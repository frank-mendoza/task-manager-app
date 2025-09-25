import { validateTask } from "@/lib/form";
import { TaskProps } from "@/types/index.types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import FormInput from "./FormInput";
import Warning from "./Warning";

interface TaskDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  task: TaskProps;
  tasks: TaskProps[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export default function TaskDetailsModal({
  visible,
  onClose,
  task,
  onDelete,
  onToggleComplete,
  tasks,
}: TaskDetailsModalProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(task.name || "");
  const [description, setDescription] = useState(task.description || "");
  const [error, setError] = useState<{
    name?: string;
    description?: string;
  } | null>({});

  const [warning, setWarning] = useState(false);

  const details = [
    {
      label: "Task Name",
      value: task.name,
      inputValue: name,
      error: error?.name,
      onChange: (text: string) => {
        setName(text);
        if (error?.name) setError((prev) => ({ ...prev, name: undefined }));
      },
    },
    {
      label: "Task Description",
      value: task.description,
      inputValue: description,
      error: error?.description,
      onChange: (text: string) => {
        setDescription(text);
        if (error?.description)
          setError((prev) => ({ ...prev, description: undefined }));
      },
    },
  ];

  const handleEdit = () => {
    if (isEdit) {
      const newTask = {
        name: name.trim(),
        description: description.trim(),
        completed: false,
      };
      const validationErrors = validateTask(
        newTask,
        tasks.filter((e) => e.name !== name)
      );

      if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors);
        return;
      }
    }

    setIsEdit((prev) => {
      if (prev) {
        task.description = description;
        task.name = name;
      }
      return !prev;
    });
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={onClose}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white w-11/12 rounded-2xl p-6 shadow-lg">
            <View className="mb-2 mt-safe-or-12">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-2xl font-bold text-gray-900">
                  Task Details
                </Text>

                {task.completed ? (
                  <View className="flex-row items-center bg-green-100 px-3 py-1 rounded-full">
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#16A34A"
                    />
                    <Text className="ml-1 text-green-700 text-sm font-medium">
                      Completed
                    </Text>
                  </View>
                ) : (
                  <View className="flex-row items-center bg-yellow-100 px-3 py-1 rounded-full">
                    <Ionicons name="time-outline" size={16} color="#CA8A04" />
                    <Text className="ml-1 text-yellow-700 text-sm font-medium">
                      Pending
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {details.map((detail, i) => (
              <View key={i} className={`mt-5 ${i === 0 ? "" : "mb-8"}`}>
                {!isEdit && <Text>{detail.label}:</Text>}
                {isEdit ? (
                  <FormInput
                    label={detail.label}
                    value={detail.inputValue}
                    onChangeText={detail.onChange}
                    placeholder="Enter task name"
                    error={detail?.error}
                  />
                ) : (
                  <Text className="text-lg font-bold text-gray-700  mt-2">
                    {detail.value}
                  </Text>
                )}
              </View>
            ))}

            {/* action buttons */}
            <View className="absolute right-6 top-5 flex-row gap-6">
              {!task.completed && (
                <TouchableOpacity onPressIn={handleEdit}>
                  <Ionicons name={isEdit ? "checkmark" : "pencil"} size={24} />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setWarning(true)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={onClose}
              className="absolute left-5 top-5"
            >
              <Ionicons name="close" size={24} />
            </TouchableOpacity>

            <View
              className={`flex-row ${
                isEdit ? "justify-between" : "justify-end"
              } items-center gap-4`}
            >
              {isEdit && (
                <TouchableOpacity
                  onPressIn={() => {
                    setIsEdit(false);
                    setDescription(task.description);
                    setName(task.name);
                  }}
                  className={`bg-red-500 rounded-lg py-4 px-5`}
                >
                  <Text className="text-white font-semibold text-center">
                    Reset
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => onToggleComplete(task.name)}
                className={`${
                  task.completed ? "bg-red-700" : "bg-green-400"
                }  rounded-lg p-4 `}
              >
                <Text className="text-white font-semibold text-center">
                  {task?.completed ? "Mark as Incomplete" : "Mark as Complete"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Warning
        visible={warning}
        onClose={() => setWarning(false)}
        onSubmit={() => {
          onDelete(task.name);
          onClose();
        }}
        message="Are you sure you want to remove this task?"
      />
    </>
  );
}
