//npm i react-usestateref SWEEP
function ListFilterer(filter, memory, setMemory, backupMemory, setBackupMemory) {
    if (filter !== '') {
        if (backupMemory.length <= memory.length)
            setBackupMemory(memory);
        setMemory(
            backupMemory.filter(element => element.service.toLowerCase().includes(filter.toLowerCase()))
        )
    }
    else {
        setMemory(backupMemory);
    }
}

export default ListFilterer