import { Button, Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

  const pages = [
    { name: "Tasks Board", path: "/" },
    { name: "Create", path: "/create" },
    { name: "Other Page", path: "/some-other-page" },
  ];


const Sidebar = () => {
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
        <Link to="/">Tasks Board</Link>
      </Text>

      <VStack spacing={6} align="flex-middle" mt={20}>
        {pages.map((page) => (
          <Link to={page.path} key={page.name}>
            <Button variant="ghost" color="black" w="full">
              {page.name}
            </Button>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
