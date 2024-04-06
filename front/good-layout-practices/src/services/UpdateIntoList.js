import Account from "../model/Account";
import axios from "axios";
import GenerateChartSample from "./GenerateChartSample";

function UpdateIntoList(mem, backupMem, setMem, setBackupMem, id, serv, mail, name, pwd, memState, setPieChartData) {
    const checkforID = mem.map(element => element.id)
    if (!checkforID.includes(id))
        throw new Error("ID NON-EXISTENT");

    const next_memory = mem.map(element => {
        if (element.id === id) {
            return new Account(id, serv, mail, name, pwd);
        }
        return element;
    });
    const next_memory_backup = backupMem.map((elementbackup) => {
        if (elementbackup.id === id) {
            return new Account(id, serv, mail, name, pwd);
        }
        return elementbackup;
    });

    const element = {service: serv, email: mail, username: name, password: pwd};
    axios.put("http://localhost:8080/accounts/" + id.toString(), element)
        .then(r =>
        {
            setMem(next_memory);
            setBackupMem(next_memory_backup);
            GenerateChartSample(memState.current, setPieChartData);
        });
}

export default UpdateIntoList