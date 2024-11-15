export const redirectAuthUser = (req, res, next) => {
	const isAuthRoute = ['/register', '/login'].includes(req.path)
	const isUserLoggedIn = req.session.user

	if (isAuthRoute) {
		if (isUserLoggedIn) {
			res.redirect('/')
		}

		return next()
	}

	if (isUserLoggedIn) {
		return next()
	}

	return res.redirect('/auth/login')
}

export const checkAuthUser = (req, res, next) => {
	const isAuthRoute = ['/register', '/login'].includes(req.path)
	const isUserLoggedIn = req.session.user

	if (isAuthRoute) {
		if (isUserLoggedIn) {
			return
		}

		return next()
	}

	if (isUserLoggedIn) {
		return next()
	}
}
