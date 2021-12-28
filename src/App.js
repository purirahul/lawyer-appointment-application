import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookAppointment from "./component/bookAppointment";
import AppointmentHistory from "./component/appointmentHistory";
import NavBar from "./component/navBar";

function App() {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col p-0">
					<NavBar />
					<Routes>
						<Route path="/" element={<BookAppointment />} />
						<Route
							path="/history"
							element={<AppointmentHistory />}
						/>
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
