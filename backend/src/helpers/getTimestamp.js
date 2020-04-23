function getTimestamp() {
	var dateNow = new Date();
	var dateMM = dateNow.getMonth() + 1;
	dateDD = dateNow.getDate();
	(dateYY = dateNow.getFullYear()), (h = dateNow.getHours());
	m = dateNow.getMinutes();
	return (
		dateNow.getFullYear() +
		"" +
		(dateMM <= 9 ? "0" + dateMM : dateMM) +
		"" +
		(dateDD <= 9 ? "0" + dateDD : dateDD) +
		(h <= 9 ? "0" + h : h) +
		(m <= 9 ? "0" + m : m)
	);
}

module.exports = getTimestamp;