import {
  Button,
  Container,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode";


const Navbar = () => {
  return (
    <Container px={4} position="fixed" right={0}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <HStack spacing={2} alignItems={"center"} ml="auto">
          <Link to={"/create"}>
            <Button color={"#e89700"} variant="surface" size="xl">
              Create
            </Button>
          </Link>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
