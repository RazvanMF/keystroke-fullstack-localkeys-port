import axios from "axios";

async function AddToList_Stateless(mem, serv, mail, name, pwd) {
    const element = {service: serv, email: mail, username: name, password: pwd};
    await axios.post("http://localhost:8080/accounts", element)
        .then(async response => {
            await axios.get("http://localhost:8080/lastID")
                .then((response) => {
                    mem.push({id: response.data, service: serv, email: mail, username: name, password: pwd});
                });
        });
    return mem;
}

export default AddToList_Stateless