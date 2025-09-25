type TaskForm = {
  name: string;
  description: string;
};

type Errors<T> = Partial<Record<keyof T, string>>;

export function validateTask(
  values: TaskForm,
  tasks: TaskForm[]
): Errors<TaskForm> {
  const errors: Errors<TaskForm> = {};

  const fields: { key: keyof TaskForm; label: string; required?: boolean }[] = [
    { key: "name", label: "Task name", required: true },
    { key: "description", label: "Task description", required: true },
  ];

  // Required field validation
  fields.forEach((field) => {
    const value = values[field.key]?.trim();
    if (field.required && !value) {
      errors[field.key] = `⚠️ ${field.label} is required.`;
    }
  });

  // Unique name validation
  const foundName = tasks.find(
    (task) =>
      task.name.trim().toLowerCase() === values.name.trim().toLowerCase()
  );
  if (foundName) {
    errors.name = "⚠️ Task with this name already exists.";
  }

  return errors;
}
