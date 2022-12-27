function fomatDate(dateTime) {
    try {
        if(dateTime != null && dateTime != 0 && dateTime != undefined) {
            // Chuyển thành dữ liệu ngày tháng:
            dateTime = new Date(dateTime);
            let date = dateTime.getDate();
            date = date < 10 ? `0${date}` : date;
            let month = dateTime.getMonth() + 1;
            month = month < 10 ? `0${month}` : month;
            let year = dateTime.getFullYear();
            return `${date}/${month}/${year}`;
        } else {
            return "";
        }
        
    } catch (error) {
        console.log(error);
        return "";
    }
}

function formatMoney(money) {
    try {
        console.log(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money));
    } catch (error) {
        console.log(error);
        return "";
    }
}