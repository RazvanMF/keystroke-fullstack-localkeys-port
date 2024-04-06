import React from "react";
import {Input} from "@mui/joy";

function AccountEntryForm(props) {
    return (
        <>
            <label htmlFor="fieldService">IDENTIFIER:</label>
            <Input
                type={"text"}
                value={props.id}
                onChange={(event) => props.setID(event.target.value)}
                disabled
            />
            <label htmlFor="fieldService">Service:</label>
            <Input
                type={"text"}
                value={props.service}
                onChange={(event) => props.setService(event.target.value)}
            />
            <label htmlFor="fieldEmail">Email:</label>
            <Input
                type={"text"}
                value={props.email}
                onChange={(event) => props.setEmail(event.target.value)}
            />
            <label htmlFor="fieldUsername">Username:</label>
            <Input
                type={"text"}
                value={props.username}
                onChange={(event) => props.setUsername(event.target.value)}
            />
            <label htmlFor="fieldPassword">Password:</label>
            <Input
                type={"text"}
                value={props.password}
                onChange={(event) => props.setPassword(event.target.value)}
            />
        </>
    );
}

export default AccountEntryForm;