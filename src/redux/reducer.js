import * as actionTypes from "./actionTypes";

const initialState = {
	fetchingLawyerData: false,
	lawyerData: [],
	bookingAppointment: false,
	appointmentHistory: [],
};

const appointmentManagementReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_LAWYER_DETAILS_REQUEST:
			return {
				...state,
				fetchingLawyerData: true,
				lawyerData: [],
			};
		case actionTypes.FETCH_LAWYER_DETAILS_SUCCESS:
			return {
				...state,
				fetchingLawyerData: false,
				lawyerData: action.payload,
			};
		case actionTypes.FETCH_LAWYER_DTAILS_FAILED:
			return {
				...state,
				fetchingLawyerData: false,
				lawyerData: [],
			};

		case actionTypes.BOOK_APPOINTMENT_REQUEST:
			return {
				...state,
				bookingAppointment: true,
			};
		case actionTypes.BOOK_APPOINTMENT_SUCCESS:
			return {
				...state,
				bookingAppointment: false,
				lawyerData: action.payload,
				appointmentHistory: [
					...state.appointmentHistory,
					...action.appointment,
				],
			};
		case actionTypes.BOOK_APPOINTMENT_FAILED:
			return {
				...state,
				bookingAppointment: false,
			};
		default:
			return state;
	}
};

export default appointmentManagementReducer;
