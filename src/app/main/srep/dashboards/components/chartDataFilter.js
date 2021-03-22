export const filterByMonths = (list = [], chartYearfilter = "all") => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    let dataArray = [];
    for (let index = 0; index < monthNames.length; index++) {
        const element = monthNames[index];
        const filteredList = list.filter(e => {
            if (chartYearfilter !== 'all') {
                return e.month === element && e.year === chartYearfilter
            } else {
                return e.month === element
            }
        })
        dataArray.push(filteredList.length);
    }
    console.log('DataArray: ', dataArray);
    return dataArray;
}