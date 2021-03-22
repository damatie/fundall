export const filterByMonths = (list = [], chartYearfilter) => {
    console.log('chartYearfilter: ', chartYearfilter);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    let dataArray = [];
    for (let index = 0; index < monthNames.length; index++) {
        const element = monthNames[index];
        console.log('List: ', list);
        const filteredList = list.filter(e => {
            return (e.month === element && e.year === chartYearfilter)
        })
        dataArray.push(filteredList.length);
    }
    return dataArray;
}