const navbar = () => {
	const navbarMenu = document.querySelector('.navbar-menu')
	const navbarButton = document.querySelector('.navbar-mobile-menu-button')

	navbarButton.onclick = () => {
		navbarButton.classList.toggle('navbar-mobile-menu-button__open')
		navbarMenu.classList.toggle('-translate-x-full')
	}
}

export default navbar
