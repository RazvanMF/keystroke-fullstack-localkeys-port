import axios from "axios"
import AddToList_Stateless from "./AddToList_Stateless.mjs";
import * as assert from "assert";
import DeleteFromList_Stateless from "./DeleteFromList_Stateless.mjs";
import UpdateIntoList_Stateless from "./UpdateIntoList_Stateless.mjs";

async function MainTester() {
    // CHECK IF SERVER IS ONLINE
    try {
        await axios.get("http://localhost:8080/isOnline")
            .then(response =>
            {
                if (response.data === "yes")
                    console.log("[+]Server is online!\n[i]Pulling data and commencing testing...");
            });
    }
    catch (e) {
        console.log("[!]Server is offline!\n[i]Halting operations...")
        return;
    }

    // RETRIEVE DATA
    let backendMemory = [];
    try {
        await axios.get("http://localhost:8080/accounts")
            .then(response => {
                response.data.forEach((entry) => backendMemory.push(entry))
                console.log("[+]Successfully fetched the data.\n[i]STATUS CODE: " + response.status);
            });
    }
    catch (e) {
        console.log("[!]Connection to server was severed!\n[i]Halting operations...")
        return;
    }

    //PERFORM CRUD OPERATIONS
    let memoryAfterOperation = [];

    //region PERFORM STATELESS ADDS
    try {
        console.assert(backendMemory.length === 5);
        backendMemory = await AddToList_Stateless(backendMemory, "serviceToAdd", "goodEmail@me.com", "toAddSuccessfully", "-");
        console.assert(backendMemory.length === 6);

        await axios.get("http://localhost:8080/accounts")
            .then(response => {
                response.data.forEach((entry) => memoryAfterOperation.push(entry));
            });
        console.assert(memoryAfterOperation.length === 6);
        console.assert(
            memoryAfterOperation[memoryAfterOperation.length - 1].service === "serviceToAdd" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].email === "goodEmail@me.com" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].username === "toAddSuccessfully" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].password === "-"
        );
        console.log("[+]Basic add operation test passed.");
    }
    catch (e) {
        console.log("[!]This operation should not fail. Please restart the backend server. If this persists, error should be investigated. Either way, the application will not behave as expected.");
        return;
    }

    try {
        //Try to add the same thing again
        memoryAfterOperation = [];
        console.assert(backendMemory.length === 6);
        backendMemory = await AddToList_Stateless(backendMemory, "serviceToAdd", "goodEmail@me.com", "toAddSuccessfully", "-");
        console.assert(backendMemory.length === 7);
        await axios.get("http://localhost:8080/accounts")
            .then(response => {
                response.data.forEach((entry) => memoryAfterOperation.push(entry));
            });
        console.assert(memoryAfterOperation.length === 6);
        console.assert(
            memoryAfterOperation[memoryAfterOperation.length - 1].service === "serviceToAdd" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].email === "goodEmail@me.com" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].username === "toAddSuccessfully" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].password === "-");
        console.log("[-]Insert duplicate test failed. Application will not behave as expected.");
        return;
    }
    catch (e) {
        console.log("[+]Insert duplicate test passed.");
    }

    try {
        //Try to add a service with a bad email
        memoryAfterOperation = [];
        console.assert(backendMemory.length === 6);
        backendMemory = await AddToList_Stateless(backendMemory, "serviceBadEmail", "goodEmailme.com", "toAddNo", "-");
        console.assert(backendMemory.length === 7);
        await axios.get("http://localhost:8080/accounts")
            .then(response => {
                response.data.forEach((entry) => memoryAfterOperation.push(entry));
            });
        console.assert(memoryAfterOperation.length === 6);
        console.assert(
            memoryAfterOperation[memoryAfterOperation.length - 1].service === "serviceBadEmail" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].email === "goodEmailme.com" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].username === "toAddNo" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].password === "-");
        console.log("[-]Insert validation test failed. Application will not behave as expected.");
        return;
    }
    catch (e) {
        console.log("[+]Insert validation test passed.");
    }
    //endregion

    //region PERFORM STATELESS DELETES
    try {
        memoryAfterOperation = [];
        console.assert(backendMemory.length === 6)
        backendMemory = await DeleteFromList_Stateless(backendMemory.length - 1, backendMemory);
        console.assert(backendMemory.length === 5);

        await axios.get("http://localhost:8080/accounts")
            .then(response => {
                response.data.forEach((entry) => memoryAfterOperation.push(entry));
            });
        console.assert(memoryAfterOperation.length === 5);
        console.assert(
            memoryAfterOperation[memoryAfterOperation.length - 1].service !== "serviceToAdd" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].email !== "goodEmail@me.com" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].username !== "toAddSuccessfully" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].password !== "-");
        console.log("[+]Basic delete operation test passed.");
    }
    catch (e) {
        console.log("[-]This operation should not fail regardless of the passed ID, please investigate this.")
    }
    // endregion

    //region PERFORM STATELESS UPDATES
    try {
        memoryAfterOperation = [];
        console.assert(backendMemory.length === 5);
        backendMemory = await UpdateIntoList_Stateless(backendMemory, 5, "Facebook 2", "budasurazvan@gmail.ro", "RazvanMFLion", "+");
        console.assert(backendMemory.length === 5);

        await axios.get("http://localhost:8080/accounts")
            .then(response => {
                response.data.forEach((entry) => memoryAfterOperation.push(entry));
            });
        console.assert(memoryAfterOperation.length === 5);
        console.assert(memoryAfterOperation[memoryAfterOperation.length - 1].id === 5 &&
            memoryAfterOperation[memoryAfterOperation.length - 1].service === "Facebook 2" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].email === "budasurazvan@gmail.ro" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].username === "RazvanMFLion" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].password === "+");
        console.log("[+]Basic update operation test passed.");
    }
    catch (e) {
        console.log("[-]Basic update operation test failed. Application will not behave as expected.");
        return;
    }

    try {
        //Try to update a service with a bad email
        memoryAfterOperation = [];
        console.assert(backendMemory.length === 5);
        backendMemory = await UpdateIntoList_Stateless(backendMemory, 5, "Facebook 2", "budasurazvangmail.ro", "RazvanMFLion", "+");
        console.assert(backendMemory.length === 5);
        await axios.get("http://localhost:8080/accounts")
            .then(response => {
                response.data.forEach((entry) => memoryAfterOperation.push(entry));
            });
        console.assert(memoryAfterOperation.length === 5);
        console.assert(memoryAfterOperation[memoryAfterOperation.length - 1].id === 5 &&
            memoryAfterOperation[memoryAfterOperation.length - 1].service === "Facebook 2" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].email === "budasurazvangmail.ro" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].username === "RazvanMFLion" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].password === "+");
        console.log("[-]Update validation test failed. Application will not behave as expected.");
        return;
    }
    catch (e) {
        console.log("[+]Update validation test passed.");
    }

    try {
        //Try to add the same thing again
        memoryAfterOperation = [];
        console.assert(backendMemory.length === 5);
        backendMemory = await UpdateIntoList_Stateless(backendMemory, 5, "Reddit", "budasurazvan.mf@gmail.com", "RazvanMF", "redditpassword");
        console.assert(backendMemory.length === 5);
        await axios.get("http://localhost:8080/accounts")
            .then(response => {
                response.data.forEach((entry) => memoryAfterOperation.push(entry));
            });
        console.assert(memoryAfterOperation.length === 5);
        console.assert(memoryAfterOperation[memoryAfterOperation.length - 1].id === 5 &&
            memoryAfterOperation[memoryAfterOperation.length - 1].service === "Reddit" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].email === "budasurazvan.mf@gmail.com" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].username === "RazvanMF" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].password === "redditpassword");
        console.log("[-]Update into duplicate test failed. Application will not behave as expected.");
        return;
    }
    catch (e) {
        console.log("[+]Update into duplicate test passed.");
    }
    // endregion

    //REVERT
    try {
        memoryAfterOperation = [];
        console.assert(backendMemory.length === 5);
        backendMemory = await UpdateIntoList_Stateless(backendMemory, 5, "Facebook", "budasurazvan.mf@gmail.com", "RazvanMF", "genericfacebookpassword");
        console.assert(backendMemory.length === 5);

        await axios.get("http://localhost:8080/accounts")
            .then(response => {
                response.data.forEach((entry) => memoryAfterOperation.push(entry));
            });
        console.assert(memoryAfterOperation.length === 5);
        console.assert(memoryAfterOperation[memoryAfterOperation.length - 1].id === 5 &&
            memoryAfterOperation[memoryAfterOperation.length - 1].service === "Facebook" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].email === "budasurazvan.mf@gmail.com" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].username === "RazvanMF" &&
            memoryAfterOperation[memoryAfterOperation.length - 1].password === "genericfacebookpassword");
        console.log("[+]Revert update operation performed successfully.");
    }
    catch (e) {
        console.log("[-]Revert update operation failed. Application will not behave as expected.");
        return;
    }
}

MainTester();