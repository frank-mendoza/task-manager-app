import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateUserScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    if (!name || !email) {
      alert("Name and Email are required!");
      return;
    }
    console.log({ name, email, role });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white px-4"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text className="text-xl font-bold text-gray-900 my-6">Create Task</Text>
      <View className="flex-1 justify-center items-center ">
        <View className="mb-4 w-full">
          <Text className="text-gray-700 mb-2">Task name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            className="border border-gray-300 rounded-lg p-3 text-gray-900 w-full"
          />
        </View>

        <View className="mb-4 w-full">
          <Text className="text-gray-700 mb-2">Task description</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg p-3 text-gray-900 w-full"
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#FFD700] rounded-xl py-4 items-center w-full"
        >
          <Text className="text-black font-semibold text-lg">Save User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 py-3 items-center w-full"
        >
          <Text className="text-gray-500">Cancel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
