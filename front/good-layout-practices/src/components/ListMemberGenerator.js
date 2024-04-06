import {
    Accordion,
    AccordionDetails,
    AccordionGroup,
    AccordionSummary, Chip,
    ListItem,
    ListItemContent, Sheet,
    Typography
} from "@mui/joy";
import {Delete, Edit} from "@mui/icons-material";

import FormSetter from "../services/FormSetter";
import DeleteFromList from "../services/DeleteFromList";

function ListMemberGenerator(props) {
    if (props.mem.length === 0) {
        return (
            <ListItem>
                <ListItemContent>
                    <Typography
                        sx={{textAlign: "center"}}
                    >
                        You don't have any accounts inside the database.
                    </Typography>
                    <Typography
                        sx={{textAlign: "center"}}
                    >
                        Add one anytime by inputting the information and pressing the button!
                    </Typography>
                </ListItemContent>
            </ListItem>
        )
    }

    const list_items = props.mem.map((element, index) =>
        <ListItem itemID={index}>
            <AccordionGroup
                variant={"outlined"}
            >
                <Accordion>
                    <AccordionSummary>{element.service}</AccordionSummary>
                    <AccordionDetails>
                        <Typography>{"Email: "} {element.email}</Typography>
                        <Typography>{"Username: "} {element.username}</Typography>
                        <Typography>{"Password: "} {element.password}</Typography>
                        <Sheet
                            sx={{display: 'flex', flexDirection: 'row-reverse', gap:'10px'}}
                        >
                            <Chip
                                color={"danger"}
                                variant={"solid"}
                                startDecorator={<Delete />}
                                onClick={() => {
                                    alert('Pressed on Delete');
                                    DeleteFromList(index, props.mem, props.setMem, props.backupMem, props.setBackupMem, props.memState, props.setPCData);
                                }}
                            >
                                Delete
                            </Chip>
                            <Chip
                                color={"warning"}
                                variant={"solid"}
                                startDecorator={<Edit />}
                                onClick={() => {
                                    alert('Pressed on Edit');
                                    FormSetter(element.id, props.setID, element.service, props.setServ, element.email, props.setMail,
                                        element.username, props.setName, element.password, props.setPass)
                                }}
                            >
                                Edit
                            </Chip>
                        </Sheet>
                    </AccordionDetails>
                </Accordion>
            </AccordionGroup>
        </ListItem>
    )
    return (list_items);
}

export default ListMemberGenerator;