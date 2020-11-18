const combineDates = (dates, closes) => {
    const combinedDates = []
    for (let i = 0; i < dates.length; i++) {
        let currentDate = {}
        if (closes[i]) {
        currentDate.close = closes[i]
        currentDate.date = dates[i]
        combinedDates.push(currentDate)
        }
    }

    return combinedDates

}

const calculatePercentChange = (base, closes) => {
    const finalEquity = closes[closes.length - 1].close
    const percentChange = (finalEquity - base) / base
    const nominalDifference = finalEquity - base
    return { percentChange, nominalDifference }
}

const calculatePercentChangeFromCloses = (closes) => {
    const firstEquity = closes[0]
    const finalEquity = closes[closes.length - 1]
    const percentChange = (finalEquity.close - firstEquity.close) / firstEquity.close
    const nominalDifference = finalEquity.close - firstEquity.close
    return { percentChange, nominalDifference }
}


const formatStatistics = (num, digits) => {
    if (!num) {
        return ''
    }
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "B" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + " " + si[i].symbol;
}


export { combineDates, calculatePercentChange, formatStatistics, calculatePercentChangeFromCloses }