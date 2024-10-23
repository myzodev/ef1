const counter = () => {
	const countDownHrs = document.getElementById('count-down-hrs')
	const countDownMin = document.getElementById('count-down-min')
	const countDownSec = document.getElementById('count-down-sec')

	const countDownDate = new Date('Jan 5, 2050 12:00:00').getTime()

	if (!countDownHrs || !countDownMin || !countDownSec) return

	const updateTimer = () => {
		const now = new Date().getTime()

		const distance = countDownDate - now

		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((distance % (1000 * 60)) / 1000)

		countDownHrs.textContent = hours
		countDownMin.textContent = minutes
		countDownSec.textContent = seconds

		if (distance < 0) {
			clearInterval(x)
		}
	}

	updateTimer()

	const x = setInterval(updateTimer, 1000)
}

export default counter
