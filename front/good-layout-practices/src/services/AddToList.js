import Account from "../model/Account";
import axios from "axios";
import GenerateChartSample from "./GenerateChartSample";

function AddToList(mem, backupMem, setMem, setBackupMem, serv, mail, name, pwd, memState, setPieChartData) {
    const element = {service: serv, email: mail, username: name, password: pwd};
    axios.post("http://localhost:8080/accounts", element)
        .then(response =>
        {
            axios.get("http://localhost:8080/lastID")
                .then((response) =>
                {
                    setMem([
                        ...mem,
                        new Account(response.data, serv, mail, name, pwd)
                    ]);

                    setBackupMem([
                        ...backupMem,
                        new Account(response.data, serv, mail, name, pwd)
                    ]);
                    GenerateChartSample(memState.current, setPieChartData);
                });
        });
}

export default AddToList