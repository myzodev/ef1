export const checkUserLoggedIn = (req, res, next) => {
	const isAuthRoute = ['/register', '/login'].includes(req.path)
	const isUserLoggedIn = req.session.user

	if (isAuthRoute) {
		if (isUserLoggedIn) {
			return res.redirect('/')
		}

		return next()
	}

	if (isUserLoggedIn) {
		return next()
	}

    req.flash('error', 'You must be logged in to access this page')
	res.redirect('/auth/login')
}

export const checkUserIsAdmin = (req, res, next) => {
    const currentUser = req.session.user

    if (currentUser.is_admin) return next()

    req.flash('error', 'You do not have permission to access this page')
	res.redirect('/admin')
}