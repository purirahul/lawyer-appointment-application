import { Outlet, NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary align-items-center">
				<a className="navbar-brand mb-0 h1" href="/">
					<img
						src="lawyer-2.png"
						width="30"
						height="30"
						className="d-inline-block align-top mr-2"
					/>
					LAMS
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<div className="navbar-nav ml-auto">
						<NavLink
							to="/"
							activeClassName="is-active"
							className="nav-item nav-link"
						>
							Appointment
						</NavLink>

						<NavLink
							to="/history"
							activeClassName="is-active"
							className="nav-item nav-link"
						>
							History
						</NavLink>
					</div>
				</div>
			</nav>
			<Outlet />
		</>
	);
};

export default NavBar;
