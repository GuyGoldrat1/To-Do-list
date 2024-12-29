import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Select,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";


import { Toaster, toaster } from "../components/ui/toaster";
import { useTaskStore } from "../store/tasks";

const CreatePage = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    assigned_user_id: "",
    priority_id: "1", // Default to "Low"
    status_id: "1", // Default to "Draft"
  });
  const { createTask } = useTaskStore();

  const handleAddTask = async () => {
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
      { label: "Low", value: "1" },
      { label: "Medium", value: "2" },
      { label: "High", value: "3" },
      { label: "Urgent", value: "4" },
    ],
  });


  return (
    <Container maxW={"container.sm"}>
      <Toaster />

      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box w={""} bg={"gray.800"} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder="Task Title"
              name="title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <Input
              placeholder="Task Description"
              name="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <Input
              placeholder="Due Date"
              name="due_date"
              type="date"
              value={newTask.due_date}
              onChange={(e) =>
                setNewTask({ ...newTask, due_date: e.target.value })
              }
            />
            <Input
              placeholder="Assigned User ID"
              name="assigned_user_id"
              type="number"
              value={newTask.assigned_user_id}
              onChange={(e) =>
                setNewTask({ ...newTask, assigned_user_id: e.target.value })
              }
            />
            <SelectRoot collection={prioritys} size="sm" width="320px">
              <SelectTrigger>
                <SelectValueText placeholder="Select priority">
                  {
                    prioritys.find(
                      (priority) => priority.value === newTask.priority_id
                    )?.label
                  }
                </SelectValueText>
              </SelectTrigger>
              <SelectContent>
                {prioritys.items.map((priority) => (
                  <SelectItem item={priority} key={priority.value}>
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

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
