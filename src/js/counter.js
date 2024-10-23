const counter = () => {
	const countDownHrs = document.getElementById('count-down-hrs')
	const countDownMin = document.getElementById('count-down-min')
	const countDownSec = document.getElementById('count-down-sec')

	const countDownDate = new Date('Dec 31, 2050 23:59:59').getTime()

	if (!countDownHrs || !countDownMin || !countDownSec) return

	const x = setInterval(updateTimer, 1000)

	updateTimer()

	function updateTimer() {
		const now = new Date().getTime()

		const distance = countDownDate - now

		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((distance % (1000 * 60)) / 1000)

		countDownHrs.textContent = hours
		countDownMin.textContent = minutes
		countDownSec.textContent = seconds

		if (distance < 0) {
			countDownHrs.textContent = '0'
			countDownMin.textContent = '0'
			countDownSec.textContent = '0'

			clearInterval(x)
		}
	}
}

export default counter
