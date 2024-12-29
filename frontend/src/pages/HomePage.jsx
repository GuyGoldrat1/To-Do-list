import { Container, VStack, Text, SimpleGrid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTaskStore } from "../store/tasks"; // Updated to use Task store
import TaskCard from "../components/TaskCard"; // Component to render individual tasks
import { Toaster } from "../components/ui/toaster";

const HomePage = () => {
  const { fetchTasks, tasks } = useTaskStore();
  const [searchParams] = useSearchParams();
  const statusId = searchParams.get("status_id");

  const headerTitles = {
    1: "Draft Tasks",
    2: "Dashboard Tasks",
    3: "On Hold Tasks",
    4: "Completed Tasks",
    5: "Deleted Tasks",
  };

  useEffect(() => {
    fetchTasks(statusId); // Pass status_id to fetchTasks
  }, [fetchTasks, statusId]);

  return (
    <Container maxW="container.xl" py={12}>
      <Toaster />
      <VStack spacing={8} mt={30} ml={250}>
        <Heading
          as={"h1"}
          size={"2xl"}
          bg={"black"}
          bgClip={"text"}
          textAlign={"center"}
        >
          {headerTitles[statusId] || "Current Tasks"} {/* Dynamic header */}
        </Heading>
        <SimpleGrid
          columns={{
            base: 1,
            md: tasks.length === 1 ? 1 : 2, // Ensure centering for a single card
            lg: tasks.length <= 2 ? tasks.length : 3,
          }}
          columnGap="10"
          rowGap="10"
          justifyContent="center"
        >
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task._id} task={task} /> // Updated to use TaskCard
            ))
          ) : (
            <Text
              mt={200}
              fontSize="xl"
              textAlign="center"
              fontWeight="bold"
              color="gray.500"
            >
              No tasks found{" "}
            </Text>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
