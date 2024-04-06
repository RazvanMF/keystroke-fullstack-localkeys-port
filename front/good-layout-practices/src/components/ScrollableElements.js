import {
    Accordion,
    AccordionDetails,
    AccordionGroup,
    AccordionSummary, Chip, List,
    ListItem,
    ListItemContent, Sheet,
    Typography
} from "@mui/joy";
import {Delete, Edit} from "@mui/icons-material";
import DeleteFromList from "../services/DeleteFromList";
import FormSetter from "../services/FormSetter";

function ScrollableElements(props) {
    const list_items = props.mem.map((element, index) =>
            <AccordionGroup
                variant={"outlined"}
                size={"lg"}
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
                                    DeleteFromList(index, props.internalMem, props.setInternalMem, props.backupMem, props.setBackupMem, props.internalMemState, props.setPCData);
                                    props.setPage(0);
                                    props.setMem(props.displayReset());
                                    props.setMore(true);
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
                                    FormSetter(element.service, props.setServ, element.email, props.setMail,
                                        element.username, props.setName, element.password, props.setPass)
                                }}
                            >
                                Edit
                            </Chip>
                        </Sheet>
                    </AccordionDetails>
                </Accordion>
            </AccordionGroup>
    )
    return (list_items);
}

export default ScrollableElements;