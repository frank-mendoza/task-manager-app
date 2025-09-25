import CreateModal from "@/components/CreateMdal";
import CustomToast from "@/components/CustomToast";
import TaskDetailsModal from "@/components/DetailsModal";
import RenderItem from "@/components/RenderItem";
import { CustomToastProps, TaskProps } from "@/types/index.types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TaskList() {
  const insets = useSafeAreaInsets();
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [toastProps, setToastProps] = useState<CustomToastProps>({
    visible: false,
    message: "",
  });
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleToggleComplete = (name: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.name === name ? { ...t, completed: !t.completed } : t))
    );
    setSelectedTask(null);
  };

  const handleDelete = (name: string) => {
    setTasks((prev) => prev.filter((t) => t.name !== name));
    setSelectedTask(null);
    setTimeout(() => {
      setToastProps({
        visible: true,
        message: "🎉 Successfully removed task!",
      });
    }, 800);
  };

  const endText = "No task available";
  return (
    <View className="flex-1 bg-gray-50 px-6 pt-6 relative">
      <Text className="text-xl font-bold text-gray-900 mb-4">My Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={(e) => (
          <RenderItem
            item={e.item}
            setToastProps={setToastProps}
            setSelectedTask={setSelectedTask}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 py-4">{endText}</Text>
        }
        contentContainerStyle={{
          gap: 12,
          paddingBottom: insets.bottom + 80,
        }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => setShowCreateModal(true)}
        className="absolute bottom-20 mb-5 right-6 bg-[#ffe678] rounded-full p-4 shadow-lg"
      >
        <Ionicons name="add" size={28} color="#151312" />
      </TouchableOpacity>

      {/* MODALS */}

      {/* create new task modal */}
      <CreateModal
        setTasks={setTasks}
        visible={showCreateModal}
        tasks={tasks}
        setToastProps={setToastProps}
        onClose={() => setShowCreateModal(false)}
      />
      {selectedTask && (
        <TaskDetailsModal
          tasks={tasks}
          visible={!!selectedTask}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />
      )}

      <CustomToast
        toastProps={toastProps}
        onHide={() =>
          setToastProps({
            visible: false,
            message: "",
          })
        }
      />
    </View>
  );
}
