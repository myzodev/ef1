const tabs = () => {
	const tabsButtons = document.querySelectorAll('#tabs button')
	const tabs = document.querySelectorAll('#tabs [id^="tab"]')

	if (!tabsButtons || !tabs) return

	tabsButtons.forEach((button) => {
		const tabID = `tab-${button.dataset.showTab}`
		const correspondingTab = document.getElementById(tabID)

		button.onclick = () => {
			tabs.forEach((tab) => tab.classList.add('hidden'))
			correspondingTab.classList.remove('hidden')

			tabsButtons.forEach((button) => {
				button.classList.remove('text-primary-300', 'border-primary-300')
				button.classList.add('text-neutral-60', 'border-neutral-60')
			})

			button.classList.add('text-primary-300', 'border-primary-300')
		}
	})
}

export default tabs
