import { AlertDialog, Box, Button, Card, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes"
import { useState } from "react";
import useVoteOnProposal from "../hooks/useVoteOnProposal";
// import useUpdateTodo from "../hooks/useUpdateTodo";
// import useDeleteTodo from "../hooks/useDeleteTodo";
// import useCompleteTodo from "../hooks/useCompleteTodo";


const Proposal = ({ proposal, index }) => {

    // const handleTodoEdit = useUpdateTodo();
    // const handleDeleteTodo = useDeleteTodo();
    // const handleTodoCompleted = useCompleteTodo();
    const handleVoteOnProposal = useVoteOnProposal();

    const { title, description,  voteCount = 0, quorum, status } = proposal;

    // const [newFields, setNewFields] = useState({
    //     newtitle: title || "",
    //     newdescription: description || "",
    // })

    // const handleChange = (name, e) => {
    //     setNewFields((prevState) => ({ ...prevState, [name]: e.target.value }));
    // }
    // const { newtitle, newdescription } = newFields;

    // Method for updating todo
    // const handleUpdate = (value) => {
    //     const index = Number(value);
    //     handleTodoEdit(index, newtitle, newdescription);
    //     setNewFields({
    //         newtitle,
    //         newdescription,
    //     })
    // }

    // Method for deleting a todo
    const handleVote = (value) => {
        const index = Number(value);
        handleVoteOnProposal(index);
    }

    // Method for completing a todo
    // const handleDone = (value) => {
    //     const index = Number(value);
    //     handleTodoCompleted(index);
    // }

    return (
        <Box className="w-full">
            <Card variant="surface" >
                <Flex direction={"column"} gap={6}>
                    <Text as="div" size="2" weight="bold">
                        Title
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {title}
                    </Text>
                    <Text as="div" size="2" weight="bold">
                        Description
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {description}
                    </Text>
                    <Text as="div" size="2" weight="bold">
                        VoteCount
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {voteCount}
                    </Text>
                    <Text as="div" size="2" weight="bold">
                    Quorum
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {quorum}
                    </Text>
                    <Text as="div" size="2" weight="bold">
                        Status
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {status}
                    </Text>
                </Flex>

                <div className="w-full flex justify-start mt-4 items-center gap-4">
                  

                 

                 
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button color="green">Vote On Proposal</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="450px">
                            <AlertDialog.Title>Vote</AlertDialog.Title>
                            <AlertDialog.Description size="2">
                               confirmed you are voting on this  proposal
                            </AlertDialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button onClick={() => handleVote(index)} variant="solid" color="green">
                                        Vote On
                                    </Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </div>
            </Card>
        </Box>

    )
}

export default Proposal