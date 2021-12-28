import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bookAppointment, fetchLawyerDetails } from "../../redux/actions";

const BookAppointment = () => {
	const dispatch = useDispatch();
	const [categories, setCategories] = useState([]);
	const [lawyersData, setLawyersData] = useState([]);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [selectedLawyer, setSelectedLawyer] = useState(null);
	const [inputData, setInputData] = useState({
		name: "",
		email: "",
		mobile: "",
		category: "",
		lawyer: "",
	});

	const { lawyerData } = useSelector((state) => state);

	const onInputChangeHandler = (e) => {
		setSuccessMessage("");
		setErrorMessage("");
		let newInput = { ...inputData };
		newInput[e.target.name] = e.target.value;
		if (e.target.name === "lawyer") {
			let data = lawyerData.filter((item) => item.id === e.target.value);
			setSelectedLawyer(data[0]);
		}

		if (e.target.name === "category") {
			setSelectedLawyer(null);
		}
		setInputData(newInput);
	};

	const onBookAppointmentClickHandler = () => {
		setSuccessMessage("");
		setErrorMessage("");
		if (
			inputData.name !== "" &&
			inputData.email !== "" &&
			inputData.mobile !== "" &&
			inputData.category !== "" &&
			inputData.lawyer !== ""
		) {
			if (selectedLawyer && selectedLawyer.appointmentSlots > 0) {
				dispatch(bookAppointment(inputData));
				setSuccessMessage("Appointment Booked Successfully");
			} else {
				setErrorMessage("Appointment Not Available");
			}
		} else {
			setErrorMessage("Please Fill All the details");
		}
	};

	useEffect(() => {
		dispatch(fetchLawyerDetails());
	}, []);

	useEffect(() => {
		if (lawyerData.length) {
			let types = [];
			for (let type of lawyerData) {
				if (!types.includes(type.speciality)) {
					types.push(type.speciality);
				}
			}
			setCategories(types);
		}
	}, [lawyerData]);

	useEffect(() => {
		if (inputData.category !== "") {
			let lawyers = lawyerData.filter(
				(data) => data.speciality === inputData.category
			);
			setLawyersData(lawyers);
		}
	}, [inputData.category]);

	console.log("lawyer", lawyerData);

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col">
					<h1 className="text-center mb-5">Book Appointment</h1>

					<form>
						<div class="form-group">
							<label>Name</label>
							<input
								type="text"
								name="name"
								className="form-control"
								placeholder="Enter Your Full Name"
								onChange={(e) => onInputChangeHandler(e)}
								value={inputData.name}
							/>
						</div>
						<div class="form-group">
							<label>E-mail</label>
							<input
								type="email"
								name="email"
								className="form-control"
								placeholder="Enter E-mail"
								onChange={(e) => onInputChangeHandler(e)}
								value={inputData.email}
							/>
						</div>
						<div class="form-group">
							<label>Mobile</label>
							<input
								type="number"
								name="mobile"
								className="form-control "
								placeholder="Enter mobile"
								onChange={(e) => onInputChangeHandler(e)}
								value={inputData.mobile}
							/>
						</div>

						<div className="row">
							<div className="col-md-6">
								<div class="form-group">
									<label>Lawyer Category</label>
									<select
										name={"category"}
										className="form-control"
										onChange={(e) =>
											onInputChangeHandler(e)
										}
										value={inputData.category}
									>
										<option>Select Lawyer Category</option>
										{categories.map((category, index) => (
											<option
												value={category}
												key={index}
											>
												{category}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="col-md-6">
								<div class="form-group">
									<label>Lawyer Name</label>
									<select
										name="lawyer"
										className="form-control"
										onChange={(e) =>
											onInputChangeHandler(e)
										}
										value={inputData.lawyer}
									>
										<option>Select Lawyer</option>
										{lawyersData.map((data) => (
											<option
												value={data.id}
												key={data.id}
											>
												{data.name}
											</option>
										))}
									</select>
								</div>

								{selectedLawyer && (
									<h6 className="text-danger text-right">
										Appointment Cost:{" "}
										{selectedLawyer && selectedLawyer.cost}
									</h6>
								)}
							</div>
						</div>

						{errorMessage && (
							<h4 className="text-center text-danger">
								{errorMessage}
							</h4>
						)}

						{successMessage && (
							<h4 className="text-center text-success">
								{successMessage}
							</h4>
						)}

						<div className="text-center">
							<button
								type="button"
								class="btn btn-primary btn-lg mt-4"
								onClick={onBookAppointmentClickHandler}
							>
								Book Appointment
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BookAppointment;
