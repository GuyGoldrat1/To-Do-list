import { Button, Box, Flex, Text, VStack, Separator } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { name: "Completed", path: "/?status_id=4" },
  { name: "Drafts", path: "/?status_id=1" },
  { name: "onHold", path: "/?status_id=3" },
  { name: "Deleted", path: "/?status_id=5" },
  { name: "All Tasks", path: "/" },
];

const Sidebar = () => {
    const location = useLocation();

  return (
    <Box
      w="250px"
      h="100vh"
      bg="white"
      p={4}
      position="fixed"
      top={0}
      left={0}
      borderRightWidth="2px"
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textTransform="uppercase"
        textAlign="center"
        bgClip="text"
        bgColor="#e89700"
        w="full"
        mt={10}
      >
        <Link to="/?status_id=2">Tasks Board</Link>
      </Text>

      <VStack spacing={6} align="flex-middle" mt={20}>
        <Link to="/?status_id=0">
          <Button
            variant="ghost"
            color="black"
            w="full"
            bg={location.search === "?status_id=0"
              ? "#efedea" : "transparent"} // Highlight active
            _hover={{ bg: "#efedea" }}
          >
            DashBoard
          </Button>
        </Link>
        <Separator size="xs" mb={10} mt={10} />

        {pages.map((page) => (
          <Link to={page.path} key={page.name}>
            <Button
              variant="ghost"
              color="black"
              w="full"
              bg={
                location.search === page.path.split("/")[1]
                  ? "#efedea"
                  : "transparent"
              } // Highlight active
              _hover={{ bg: "#efedea" }}
            >
              {page.name}
            </Button>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
