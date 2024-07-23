import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
// import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Contexts/ChatsContextProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Flex
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Flex>
  );
};

export default Chatbox;
