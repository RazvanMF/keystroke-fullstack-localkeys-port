import axios from "axios";

async function UpdateIntoList_Stateless(mem, id, serv, mail, name, pwd) {
    const checkforID = mem.map(element => element.id)
    if (!checkforID.includes(id))
        throw new Error("ID NON-EXISTENT");

    const next_memory = mem.map(element => {
        if (element.id === id) {
            return {id: id, service: serv, email: mail, username: name, password: pwd};
        }
        return element;
    });

    const element = {service: serv, email: mail, username: name, password: pwd};
    await axios.put("http://localhost:8080/accounts/" + id.toString(), element)
        .then(r =>
        {
            mem = next_memory;
        });
    return mem;
}

export default UpdateIntoList_Stateless