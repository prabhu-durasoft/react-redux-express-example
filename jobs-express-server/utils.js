class Utils {
	
	static formatDate(dateInMilliseconds){
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		let date = new Date(dateInMilliseconds)
		let formattedDate = months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
		return formattedDate
	}
}
module.exports = Utils