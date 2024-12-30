import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Textarea,
  VStack,
  createListCollection,
  Text,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { Field } from "../components/ui/field";
import { Slider } from "../components/ui/slider";
import PrioritySelector from "../components/PrioritySelector";

import { Toaster, toaster } from "../components/ui/toaster";
import { useTaskStore } from "../store/tasks";

const CreatePage = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    assigned_user_id: "1",
    priority_id: "1", // Default to "Low"
  });
  const { createTask } = useTaskStore();

  const handleAddTask = async () => {
    if (!newTask.due_date) {
      newTask.due_date = new Date(0); // Set a default value or use any placeholder
    }

    const { success, message } = await createTask(newTask);
    if (!success) {
      toaster.create({
        description: message,
        type: "error",
        duration: 3000,
      });
    } else {
      toaster.create({
        description: message,
        type: "success",
        duration: 3000,
      });
    }
  };

  const prioritys = createListCollection({
    items: [
      { label: "Low", value: "1", color: "teal" },
      { label: "Medium", value: "2", color: "green" },
      { label: "High", value: "3", color: "yellow" },
      { label: "Urgent", value: "4", color: "red" },
    ],
  });
  const handlePriorityChange = (newPriorityId) => {
    setNewTask({
      ...newTask,
      priority_id: newPriorityId, // Directly update the priority_id
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <Toaster />

      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} mt={20}>
          Create New Product
        </Heading>

        <Box w={""} bg={"white"} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Field label="Title" required>
              <Input
                name="title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </Field>
            <Field label="Description" required>
              <Textarea
                name="description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </Field>
            <Field label="due date">
              <Input
                name="due_date"
                type="date"
                value={newTask.due_date}
                onChange={(e) =>
                  setNewTask({ ...newTask, due_date: e.target.value })
                }
              />
            </Field>
            <Field label="Priority" mb={3}>
              <PrioritySelector
                items={prioritys.items}
                onChange={handlePriorityChange}
              />
            </Field>

            <Button colorScheme="blue" onClick={handleAddTask} w="full">
              Add Task
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
