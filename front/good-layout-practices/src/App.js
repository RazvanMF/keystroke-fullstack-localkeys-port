import logo from './logo.svg';
import './App.css';
import '@fontsource/inter'
import {Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Box, Button, Chip, Input, List, ListItem, ListItemContent, Sheet, Typography} from "@mui/joy";
import {Add, Build, Circle, Delete, Edit, Email, Home, QuestionMark, RestartAlt, Settings} from "@mui/icons-material";

import {memo, useEffect, setState} from "react";
import useState from 'react-usestateref'

import Account from "./model/Account";
import ListMemberGenerator from "./components/ListMemberGenerator";
import ListFilterer from "./services/ListFilterer";
import NavigationBar from "./components/NavigationBar";
import {BarChart, PieChart} from "@mui/x-charts";
import GenerateChartSample from "./services/GenerateChartSample";
import AccountEntryForm from "./components/AccountEntryForm";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollableElements from "./components/ScrollableElements";

import React from "react";
import axios from "axios";
import AddToList from "./services/AddToList";
import UpdateIntoList from "./services/UpdateIntoList";

function App() {
    //MEMORY-RELATED STATES
    const [memory, setMemory, memoryState] = useState([]);
    const [backupMemory, setBackupMemory, backupMemoryState] = useState([]);

    //ACCOUNT CLASS-RELATED STATES
    const [ID, setID, currentIDState] = useState(0);
    const [service, setService] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //FILTER-RELATED STATES
    const [filter, setFilter, currentFilterState] = useState("");

    //CHART-RELATED STATES AND FUNCTIONS
    const [pieChartData, setPieChartData] = useState({});
    function FromDictionaryToData() {
        const data = []
        Object.keys(pieChartData).forEach((key, index) =>
        {
            let entry = {id: index, value: pieChartData[key], label: key};
            data.push(entry);
        })

        return data;
    }

    //INFINITE SCROLL-RELATED STATES (AND FUNCTIONS)
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage, pageState] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const getEntriesPerPage = () => {
        return memoryState.current.filter((element, index) => index >= pageState.current * pageSize
            && index < pageState.current * pageSize + pageSize)
    }
    const fetchData = () => {
        if (memory.length > displayableMemory.length)
            setTimeout(() => {
                setPage(page + 1)
                setDisplayableMemory([...displayableMemory, ...getEntriesPerPage()])
            }, 500)
        else {
            setHasMore(false);
        }
    }
    const [displayableMemory, setDisplayableMemory, displayableMemoryState] = useState(getEntriesPerPage());

    //REST API GRAB FROM BACKEND
    useEffect(() => {
        async function body() {
            const information = [];
            await fetch('http://localhost:8080/accounts')
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    data.forEach((entry) => {
                        information.push(new Account(entry.id, entry.service, entry.email, entry.username, entry.password));
                    });
                });

            setMemory(information);

            setPage(0);
            setDisplayableMemory(getEntriesPerPage());

            GenerateChartSample(memoryState.current, setPieChartData);
        }
        body();
    }, []);

    return (
        <main className={"App"}>
            <></>

            <div className={"Title"}>
                <h1 className={"Text"}> LocalKeys - Password Manager </h1>
            </div>

            <NavigationBar />

            <div className={"MainMenuGrid"}>
                <div className={"InfoEdit"}>
                    <div className={"Forms"}>
                        <AccountEntryForm id={ID} setID={setID}
                                        service={service} setService={setService}
                                        email={email} setEmail={setEmail}
                                        username={username} setUsername={setUsername}
                                        password={password} setPassword={setPassword}/>
                        <Button
                            variant={"soft"}
                            color={"neutral"}
                            startDecorator={<Add />}
                            endDecorator={<Add />}
                            onClick={() => {
                                setID(0);
                                AddToList(memory, backupMemory, setMemory, setBackupMemory, service, email, username, password, memoryState, setPieChartData);
                                //AddOrUpdateToList(memory, backupMemory, setMemory, setBackupMemory, lastID, setLastID, service, email, username, password, memoryState, setPieChartData);
                                // setPage(0);
                                // setHasMore(true);
                                // setDisplayableMemory(getEntriesPerPage());
                            }}
                        >
                            Add New Account
                        </Button>
                        <Button
                            variant={"soft"}
                            color={"neutral"}
                            startDecorator={<Build />}
                            endDecorator={<Build />}
                            onClick={() => {
                                UpdateIntoList(memory, backupMemory, setMemory, setBackupMemory, ID, service, email, username, password, memoryState, setPieChartData);
                                //AddOrUpdateToList(memory, backupMemory, setMemory, setBackupMemory, lastID, setLastID, service, email, username, password, memoryState, setPieChartData);
                                // setPage(0);
                                // setHasMore(true);
                                // setDisplayableMemory(getEntriesPerPage());
                            }}
                        >
                            Update Account with Selected Identifier
                        </Button>
                        <Button
                            variant={"soft"}
                            color={"neutral"}
                            startDecorator={<RestartAlt />}
                            endDecorator={<RestartAlt />}
                            onClick={() => {
                                setID(0);
                            }}
                        >
                            Reset ID
                        </Button>
                    </div>
                </div>
                <div className={"InfoView"}>
                    <div className={"AccountFilterer"}>
                        <label htmlFor={"fieldFilterer"}>Filter accounts based on entry:</label>
                        <Input
                            type={"text"}
                            value={filter}
                            onChange={(event) =>
                            {
                                setFilter(event.target.value);
                                ListFilterer(currentFilterState.current, memoryState.current, setMemory, backupMemory, setBackupMemory);
                                setHasMore(true);
                                setPage(0);
                                setDisplayableMemory(getEntriesPerPage())
                            }}
                        />
                        <Sheet
                            id={"parentToScroll"}
                            width={"100%"}
                            variant={"outlined"}
                            sx={{maxHeight: '60vh', overflow: 'auto'}}
                        >
                            {/*<InfiniteScroll*/}
                            {/*    dataLength={memory.length}*/}
                            {/*    hasMore={hasMore}*/}
                            {/*    next={fetchData}*/}
                            {/*    loader={<Typography>Loading...</Typography>}*/}
                            {/*    scrollableTarget={"parentToScroll"}*/}
                            {/*>*/}
                            {/*    <ScrollableElements mem={memoryState.current} setMem={setMemory}*/}
                            {/*                             backupMem={backupMemory} setBackupMem={setBackupMemory}*/}
                            {/*                             setServ={setService} setMail={setEmail}*/}
                            {/*                             setName={setUsername} setPass={setPassword}*/}
                            {/*                             setPCData={setPieChartData} internalMem={memory}*/}
                            {/*                             setInternalMem={setMemory} internalMemState={memoryState}*/}
                            {/*                   setPage={setPage} displayReset={getEntriesPerPage} setMore={setHasMore}/>*/}
                            {/*</InfiniteScroll>*/}
                            <List>
                                <ListMemberGenerator mem={memory} setMem={setMemory}
                                                     backupMem={backupMemory} setBackupMem={setBackupMemory}
                                                     setServ={setService} setMail={setEmail}
                                                     setName={setUsername} setPass={setPassword}
                                                     setID={setID}
                                                     memState={memoryState} setPCData={setPieChartData}/>
                            </List>
                        </Sheet>

                    </div>
                </div>
                <div className={"InfoAnalyze"}>
                    <div className={"PLACEHOLDER"}>
                        <Box
                            width={'100%'}
                            height={'60vh'}
                            sx={{ border: '2px solid grey', justifyContent: 'center', alignItems: 'center'}}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <PieChart
                                series={[
                                    {
                                        data: FromDictionaryToData(),
                                    },
                                ]}
                                slotProps={{
                                    legend: {
                                        direction: 'column',
                                        position: { vertical: 'bottom', horizontal: 'middle' },
                                        hidden: 'isHidden',
                                    },
                                }}
                                width={400}
                                height={200}
                            />
                        </Box>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default App;
