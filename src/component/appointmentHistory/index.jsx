import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchLawyerDetails } from "../../redux/actions";

const AppointmentHistory = () => {
	const dispatch = useDispatch();
	const [selectedLawyer, setSelectedLawyer] = useState("");
	const [historyData, setHistoryData] = useState([]);

	const { lawyerData, appointmentHistory } = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchLawyerDetails());
	}, []);

	useEffect(() => {
		if (selectedLawyer && appointmentHistory.length) {
			let history = appointmentHistory.filter(
				(data) => data.lawyer === selectedLawyer
			);
			if (history.length) {
				setHistoryData(history);
			} else {
				setHistoryData([]);
			}
		}
	}, [selectedLawyer, appointmentHistory]);

	console.log("history", historyData);

	return (
		<div className="container-fluid ">
			<h1 className="text-center mt-5 ">Appointment History</h1>
			<div className="row mt-5">
				<div className="col-sm-6">
					<form>
						<div className="form-group">
							<label className="font-weight-bold">
								Select Lawyer
							</label>
							<select
								name="lawyer"
								className="form-control"
								onChange={(e) =>
									setSelectedLawyer(e.target.value)
								}
								value={selectedLawyer}
							>
								<option>Select Lawyer</option>
								{lawyerData.map((data) => (
									<option value={data.id} key={data.id}>
										{data.name}
									</option>
								))}
							</select>
						</div>
					</form>
				</div>
			</div>
			<hr className="mt-3 mb -3" />
			<div className="row">
				{selectedLawyer && historyData.length === 0 && (
					<h2 className="text-center mt-5 text-danger">
						No Appointments Found
					</h2>
				)}
				{historyData.map((history, index) => (
					<div className="col-md-6 mt-3" key={index}>
						<div className="card">
							<div className="card-body">
								<h5 className="card-title font-weight-bold">
									{history.name}
								</h5>
								<div className="row">
									<div className="col-sm-6 col-md-4">
										<label className="mb-0 font-weight-bold">
											Mobile
										</label>
										<p>{history.mobile}</p>
									</div>
									<div className="col-sm-6 col-md-4">
										<label className="mb-0 font-weight-bold">
											Email
										</label>
										<p>{history.email}</p>
									</div>
									<div className="col-sm-6 col-md-4">
										<label className="mb-0 font-weight-bold">
											Cost
										</label>
										<p>{history[0].cost}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AppointmentHistory;
