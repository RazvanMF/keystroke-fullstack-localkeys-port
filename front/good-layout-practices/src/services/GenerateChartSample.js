function GenerateChartSample(memory, setPieChartData) {
    let newPieChartData = {};
    memory.forEach((element, index) =>
    {
        if (element.email in newPieChartData) {
            newPieChartData[element.email] += 1;
        }
        else {
            newPieChartData[element.email] = 1;
        }
    })
    setPieChartData(newPieChartData);
}

export default GenerateChartSample;