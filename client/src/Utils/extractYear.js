const extractYear = (date) => {
    if(!date) {
        return null;
    } else {
        const year = date.slice(0,4)
        return year;
    }
}

export default extractYear;
