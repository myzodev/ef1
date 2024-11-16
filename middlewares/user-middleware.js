export const redirectIfAuthenticated = (req, res, next) => {
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

	return res.redirect('/auth/login')
}
