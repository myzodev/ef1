const navbar = () => {
	const navbarMenu = document.querySelector('.navbar-menu')
	const navbarButton = document.querySelector('.navbar-mobile-menu-button')

	if (!navbarButton) return

	navbarButton.onclick = () => {
		navbarButton.classList.toggle('navbar-mobile-menu-button__open')
		navbarMenu.classList.toggle('-translate-x-full')
	}

    const userMenu = document.querySelector('.user-menu')

    if (!userMenu) return
    
    const userMenuButton = userMenu.querySelector('.user-menu-button')
    const userMenuList = userMenu.querySelector('.user-menu-list')

    userMenuButton.onclick = () => {
        userMenuList.classList.toggle('hidden')
    }
}

export default navbar
