import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTaskStore } from "../store/tasks"; // Updated to use Task store
import TaskCard from "../components/TaskCard"; // Component to render individual tasks
import { Toaster } from "../components/ui/toaster";

const HomePage = () => {
  const { fetchTasks, tasks } = useTaskStore(); // Updated store methods and state

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  console.log(tasks);

  return (
    <Container maxW="container.xl" py={12}>
      <Toaster />
      <VStack spacing={8} mt={30} ml = {250}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bg={"black"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Tasks
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          columnGap="10"
          rowGap="10"
        >
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task._id} task={task} /> // Updated to use TaskCard
            ))
          ) : (
            <Text
              fontSize="xl"
              textAlign={"center"}
              fontWeight="bold"
              color="gray.500"
            >
              No tasks found{" "}
              <Link to={"/create"}>
                <Text
                  as="span"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create a task
                </Text>
              </Link>
            </Text>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
