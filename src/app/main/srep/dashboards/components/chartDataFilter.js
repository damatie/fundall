export const filterByMonths = (list = [], chartYearfilter, filter  = 'all', filterNew = 'all') => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    let dataArray = [];
    for (let index = 0; index < monthNames.length; index++) {
        const element = monthNames[index];
        const filteredList = list.filter(e => {
            if (chartYearfilter !== 'all' ) {
                if (filter !== 'all') {
                    if (filterNew !== 'all') {
                        return (e.month === element && e.year.toString() === chartYearfilter.toString() && e.entity === filter && e.department === filterNew)
                    } else {
                        return (e.month === element && e.year.toString() === chartYearfilter.toString() && e.entity === filter)
                    }
                } else {
                    if (filterNew !== 'all') {
                        return (e.month === element && e.year.toString() === chartYearfilter.toString() && e.department === filterNew)
                    } else {
                        return (e.month === element && e.year.toString() === chartYearfilter.toString())
                    }
                }
            } else {
                if (filter !== 'all') {
                    if (filterNew !== 'all') {
                        return (e.month === element && e.entity === filter && e.department === filterNew)
                    } else {
                        return (e.month === element  && e.entity === filter)
                    }
                } else {
                    if (filterNew !== 'all') {
                        return (e.month === element && e.department === filterNew)
                    } else {
                        return (e.month === element)
                    }
                }
            }
        })
        dataArray.push(filteredList.length);
    }
    return dataArray;
}
