import * as actionTypes from "./actionTypes";
import { lawyers } from "../data/lawyerData";

export const fetchLawyerDetails = () => (dispatch) => {
	dispatch({
		type: actionTypes.FETCH_LAWYER_DETAILS_REQUEST,
	});

	let lawyerData = lawyers;
	if (lawyerData.length) {
		dispatch({
			type: actionTypes.FETCH_LAWYER_DETAILS_SUCCESS,
			payload: lawyerData,
		});
	} else {
		dispatch({
			type: actionTypes.FETCH_LAWYER_DTAILS_FAILED,
		});
	}
};

export const bookAppointment = (payload) => (dispatch, getState) => {
	dispatch({
		type: actionTypes.BOOK_APPOINTMENT_REQUEST,
	});

	let lawyerData = getState().lawyerData?.filter(
		(data) => data.id === payload.lawyer
	);
	if (lawyerData.length) {
		lawyerData[0].appointmentSlots = lawyerData[0].appointmentSlots - 1;
		let remainingLawyer = getState().lawyerData?.filter(
			(data) => data.id !== payload.lawyer
		);
		dispatch({
			type: actionTypes.BOOK_APPOINTMENT_SUCCESS,
			payload: [...remainingLawyer, ...lawyerData],
			appointment: [{ ...payload, ...lawyerData }],
		});
	} else {
		dispatch({
			type: actionTypes.BOOK_APPOINTMENT_FAILED,
		});
	}
};
