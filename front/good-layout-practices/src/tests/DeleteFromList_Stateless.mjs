import axios from "axios";

async function DeleteFromList_Stateless(index, memory) {
    let deleteforbackup = memory[index];
    await axios.delete('http://localhost:8080/accounts/' + deleteforbackup.id)
        .then(() =>
        {
            memory.splice(index, 1);
        });
    return memory;
}

export default DeleteFromList_Stateless