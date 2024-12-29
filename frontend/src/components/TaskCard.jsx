import {
  Button,
  Box,
  Text,
  Card,
  useDisclosure,
  VStack,
  Input,
  createListCollection,
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
        { label: "Low", value: "1" },
        { label: "Medium", value: "2" },
        { label: "High", value: "3" },
        { label: "Urgent", value: "4" },
      ],
    });


  return (
    <Box>
      <Card.Root width="270px" bg="blue.800">
        <Card.Body gap="2">
          <Card.Title>{task.title}</Card.Title>
          <Card.Description>{task.description}</Card.Description>
          <Text>Due: {new Date(task.due_date).toLocaleDateString()}</Text>
          <Text>
            Priority:{" "}
            {["Low", "Medium", "High", "Urgent"][task.priority_id - 1]}
          </Text>
          <Text>
            Status:{" "}
            {
              ["Draft", "In Progress", "On Hold", "Completed", "Deleted"][
                task.status_id - 1
              ]
            }
          </Text>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button colorScheme="red" onClick={() => handleDeleteTask(task._id)}>
            Delete
          </Button>

          <DialogRoot placement="center" motionPreset="slide-in-bottom">
            <DialogTrigger>
              <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack spacing={4}>
                  <Input
                    placeholder="Title"
                    value={updatedTask.title}
                    onChange={(e) =>
                      setUpdatedTask({ ...updatedTask, title: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Description"
                    value={updatedTask.description}
                    onChange={(e) =>
                      setUpdatedTask({
                        ...updatedTask,
                        description: e.target.value,
                      })
                    }
                  />
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
                  <SelectRoot collection={prioritys} size="sm" width="320px">
                    <SelectTrigger>
                      <SelectValueText placeholder="Select priority">
                        {
                          prioritys.items.find(
                            (priority) => priority.value === String(updateTask.priority_id)
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
                </VStack>
              </DialogBody>
              <DialogFooter>
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
