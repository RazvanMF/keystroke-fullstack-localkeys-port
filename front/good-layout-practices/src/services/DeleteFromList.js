import GenerateChartSample from "./GenerateChartSample";
import axios from "axios";

function DeleteFromList(index, memory, setMemory, backupMemory, setBackupMemory, memoryState, setPieChartData) {
    let deleteforbackup = memory[index];
    axios.delete('http://localhost:8080/accounts/' + deleteforbackup.id)
        .then(() =>
        {
            alert("deleted successfully");
            setMemory(
                memory.filter((element, listindex) => listindex !== index)
            );
            setBackupMemory(
                backupMemory.filter((element) => element.service !== deleteforbackup.service)
            );
            GenerateChartSample(memoryState.current, setPieChartData);
        });
}

export default DeleteFromList