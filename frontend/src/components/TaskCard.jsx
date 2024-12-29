import {
  Button,
  Box,
  Text,
  Card,
  VStack,
  Input,
  createListCollection,
  Textarea,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTaskStore } from "../store/tasks";
import { Toaster, toaster } from "./ui/toaster";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from "./ui/dialog";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { Field } from "../components/ui/field";
import { useRef } from "react";
import PrioritySelector from "./PrioritySelector";

const TaskCard = ({ task }) => {
  const { deleteTask, updateTask } = useTaskStore();
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleDeleteTask = async (taskId) => {
    const { success, message } = await deleteTask(taskId);
    toaster.create({
      description: message,
      type: success ? "success" : "error",
      duration: 3000,
    });
  };

  const handleUpdateTask = async (taskId) => {
    const { success, message } = await updateTask(taskId, updatedTask);
    toaster.create({
      description: message,
      type: success ? "success" : "error",
      duration: 3000,
    });
  };

  const prioritys = createListCollection({
    items: [
      { label: "Low", value: "1", color: "teal" },
      { label: "Medium", value: "2", color: "green" },
      { label: "High", value: "3", color: "yellow" },
      { label: "Urgent", value: "4", color: "red" },
    ],
  });
  const states = createListCollection({
    items: [
      { label: "Draft", value: "1", color: "gray" },
      { label: "In Progress", value: "2", color: "yellow" },
      { label: "On Hold", value: "3", color: "purple" },
      { label: "Completed", value: "4", color: "green" },
      { label: "Deleted", value: "5", color: "red" },
    ],
  });

  const currentState = states.items.find(
    (state) => state.value === String(task.status_id)
  );
  const currentPriority = prioritys.items.find(
    (Priority) => Priority.value === String(task.priority_id)
  );
  const handlePriorityChange = (newPriorityId) => {
    setUpdatedTask({
      ...updatedTask,
      priority_id: newPriorityId, // Directly update the priority_id
    });
  };

  return (
    <Box>
      <Card.Root
        width="300px"
        height="320px" // Fixed height for uniform card size
        bg="#ffffff"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Card.Body gap="2">
          <Badge variant="surface" colorPalette={currentState.color}>
            {currentState.label}
          </Badge>
          <Card.Title>{task.title}</Card.Title>
          <Card.Description
            height="60px" // Fixed height for descriptions
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="normal"
          >
            {task.description || "No description available"}
          </Card.Description>
          <Text>Due: {new Date(task.due_date).toLocaleDateString()}</Text>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Flex justifyContent="flex-start" width="100%">
            <Badge colorPalette={currentPriority.color} size="lg">
              {currentPriority.label}
            </Badge>
          </Flex>

          <DialogRoot placement="center" motionPreset="slide-in-bottom">
            <DialogTrigger>
              <Button variant="surface">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack spacing={4}>
                  <Field label="Title" required>
                    <Input
                      name="title"
                      value={updatedTask.title}
                      onChange={(e) =>
                        setUpdatedTask({
                          ...updatedTask,
                          title: e.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="Description" required>
                    <Textarea
                      placeholder="Description"
                      value={updatedTask.description}
                      onChange={(e) =>
                        setUpdatedTask({
                          ...updatedTask,
                          description: e.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="due date" required>
                    <Input
                      type="date"
                      value={updatedTask.due_date}
                      onChange={(e) =>
                        setUpdatedTask({
                          ...updatedTask,
                          due_date: e.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="Assigned User ID" required>
                    <Input
                      type="number"
                      placeholder="Assigned User ID"
                      value={updatedTask.assigned_user_id}
                      onChange={(e) =>
                        setUpdatedTask({
                          ...updatedTask,
                          assigned_user_id: e.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="Priority">
                    <PrioritySelector
                      items={prioritys.items}
                      onChange={handlePriorityChange}
                    />
                  </Field>
                  <Input
                    type="number"
                    value={updatedTask.status_id}
                    onChange={(e) =>
                      setUpdatedTask({
                        ...updatedTask,
                        status_id: e.target.value,
                      })
                    }
                  />
                </VStack>
              </DialogBody>
              <DialogFooter>
                <Flex justifyContent="flex-start" width="100%">
                  {task.status_id !== 5 && (
                    <Button
                      colorPalette="red"
                      variant="outline"
                      onClick={() => handleDeleteTask(task._id)}
                      mr={40}
                    >
                      Delete
                    </Button>
                  )}
                </Flex>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button onClick={() => handleUpdateTask(task._id)}>Save</Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
};

export default TaskCard;
