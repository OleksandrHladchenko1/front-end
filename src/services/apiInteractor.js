import axios from "axios";
import { concatCarNumber } from "./utils";

export class APIInteractor {
  login = async (user) => {
    try {
			const result = await axios({
				method: 'post',
				url: 'https://localhost:3443/api/auth/login',
				data: user,
			});
      if(result.status === 200) return result.data;
		} catch (err) {
			console.log(err);
		}
  };

	register = async (user) => {
		try {
			const result = await axios({
				method: 'post',
				url: 'https://localhost:3443/api/auth/register',
				data: user,
			});
			if(result.status === 201) return result.data;
		} catch (err) {
			console.log(err);
		}
	};

	getUserById = async (id) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/users/me/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			if(result.status === 200) {
				localStorage.setItem('email', result.data.user.email);
				return result.data.user;
			}
		} catch (err) {
			console.log(err);
		}
	};

	getAllWorkers = async () => {
		try {
			const result = await axios({
				method: 'get',
				url: 'https://localhost:3443/api/workers/getAllWorkers',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});

			if(result.status === 200) {
				return result.data.workers;
			}
		} catch (err) {
			console.log(err);
		}
	};

	deleteWorker = async (id) => {
		try {
			const result = await axios({
				method: 'delete',
				url: `https://localhost:3443/api/workers/deleteWorker/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result;
		} catch (err) {
			console.log(err);
		}
	};

	getFullWorkersInfo = async () => {
		try {
			const result = await axios({
				method: 'get',
				url: 'https://localhost:3443/api/workers/getFullWorkerInfo',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});

			if(result.status === 200) {
				return result.data.workers;
			}
		} catch (err) {
			console.log(err);
		}
	};

	getWorkerInfoById = async (id) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/workers/getWorkerInfoById/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});

			if(result.status === 200) {
				return result.data.worker;
			}
		} catch (err) {
			console.log(err);
		}
	};

	getWorkerSpecialities = async (id) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/workers/getWorkerSpecialities/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});

			if(result.status === 200) {
				return result.data.specialities;
			}
		} catch (err) {
			console.log(err);
		}
	}

	getWorkerById = async (id) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/workers/getWorkerById/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});

			if(result.status === 200) {
				localStorage.setItem('email', result.data.user.email);
				return result.data.user;
			}
		} catch (err) {
			console.log(err);
		}
	};

	getFullFreeWorkersInfo = async (start, end) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/workers/getFullFreeWorkerInfo/${start.length ? start : null }/${end.length ? end : null}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
		  return result.data.workers;
		} catch (err) {
			console.log(err);
		}
	};

	editWorker = async (workerId, data) => {
		try {
			const result = await axios({
				method: 'patch',
				url: `https://localhost:3443/api/workers/editWorker/${workerId}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data
			});
			return result;
		} catch (err) {
			console.log(err);
		}
	};

	getAllSpecialities = async () => {
		try {
			const result = await axios({
				method: 'get',
				url: 'https://localhost:3443/api/speciality/getAll',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
		  return result.data.specialities;
		} catch (err) {
			console.log(err);
		}
	}

	changePassword = async (passwords) => {
		try {
			const result = await axios({
				method: 'patch',
				url: 'https://localhost:3443/api/auth/changePassword',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: passwords,
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	getAllVisits = async () => {
		try {
			const result = await axios({
				method: 'get',
				url: 'https://localhost:3443/api/userVisits/allUserVisits',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			}).then((data) => data.data.visits);
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	}

	getUserVisits = async (body) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/userVisits/allUserVisits/${body.userId}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			}).then((data) => data.data.visits);
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	createVisit = async (visit) => {
		try {
			const result = await axios({
				method: 'post',
				url: `https://localhost:3443/api/userVisits/addUserVisit/${localStorage.getItem('userId')}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: visit,
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	getVisitById = async (id) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/userVisits/getVisitById/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	getFreeWorkersForTime = async (id) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/workers/getFreeWorkersForProblem/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result.data.workers;
		} catch (err) {
			throw err.response.data.message;
		}
	}
	
	

	getIssuesByVisitId = async (id, status) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/issue/getIssuesByVisitId/${id}/${status}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	getVisitIssuesBeforeSort = async (id) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/issue/getVisitIssues/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result.data.issues;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	countUserCars = async (id) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/userCars/getCount/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			console.log(result);
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	setDependency = async (id, degree, dependsOn) => {
		try {
			const result = await axios({
				method: 'patch',
				url: `https://localhost:3443/api/issue/editDependency/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: {
					degree,
					dependsOn: JSON.stringify(dependsOn),
				},
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	setSequence = async (data) => {
		try {
			const result = await axios({
				method: 'patch',
				url: `https://localhost:3443/api/issue/setSequence`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data,
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	setSorted = async (id) => {
		try {
			const result = await axios({
				method: 'patch',
				url: `https://localhost:3443/api/userVisits/setSorted/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	getSortedIssues = async (id) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/issue/getSortedIssues/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result.data.issues;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	getFreeVisitsTime = async (day) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/userVisits/getFreeVisits/${day}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result.data.visit;
		} catch (err) {
			throw err.response.data.message;
		}
	}

	deleteVisit = async () => {
		try {
			const result = await axios({
				method: 'delete',
				url: `https://localhost:3443/api/userVisits/deleteVisit/${localStorage.getItem('visitId')}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result.data.visit;
		} catch (err) {
			throw err.response.data.message;
		}
	}

	addIssue = async (issue) => {
		try {
			const result = await axios({
				method: 'post',
				url: 'https://localhost:3443/api/issue/addIssue',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: issue,
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	deleteIssue = async (id) => {
		try {
			const result = await axios({
				method: 'delete',
				url: `https://localhost:3443/api/issue/deleteIssue/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	closeIssue = async (id) => {
		try {
			const result = await axios({
				method: 'patch',
				url: `https://localhost:3443/api/issue/closeIssue/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	updateStartEndSpecialist = async (id, data) => {
		try {
			const result = await axios({
				method: 'patch',
				url: `https://localhost:3443/api/issue/updateStartEndSpecialist/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	updateUserInfo = async (user) => {
		try {
			const result = await axios({
				method: 'patch',
				url: 'https://localhost:3443/api/users/updateInfo',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: user,
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	createCar = async (car) => {
		const number = concatCarNumber(car.carCode, car.carNumber, car.carSeries);
		try {
			const result = await axios({
				method: 'post',
				url: 'https://localhost:3443/api/userCars/addUserCar',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: {
					...car,
					number,
					userId: localStorage.getItem('userId'),
				},
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	getUserCars = async (id) => {
		try {
			const result = await axios({
				method: 'get',
				url: `https://localhost:3443/api/userCars/allUserCars/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result.data.cars;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	editUserCar = async (car) => {
		try {
			const result = await axios({
				method: 'patch',
				url: `https://localhost:3443/api/userCars/editUserCar/${car.id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: {
					...car,
					number: concatCarNumber(car.carCode, car.carNumber, car.carSeries),
				},
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	deleteUserCar = async (id) => {
		try {
			const result = await axios({
				method: 'delete',
				url: `https://localhost:3443/api/userCars/deleteUserCar/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	changeVisitStatus = async (id, status) => {
		try {
			const result = await axios({
				method: 'patch',
				url: `https://localhost:3443/api/userVisits/updateVisitStatus/${id}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: { status },
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	editSpecialistInfo = async (specialist) => {
		try {
			const result = await axios({
				method: 'patch',
				url: 'https://localhost:3443/api/specialist/editSpecialist',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: specialist,
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	addSpecialist = async (specialist) => {
		console.log(specialist);
		try {
			const result = await axios({
				method: 'post',
				url: 'https://localhost:3443/api/specialist/addSpecialist',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: specialist,
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	deleteSpecialist = async (id_worker, id_speciality) => {
		try {
			const result = await axios({
				method: 'delete',
				url: `https://localhost:3443/api/specialist/deleteSpecialist/${id_worker}/${id_speciality}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};


	createPDF = async (body) => {
		try {
			await axios ({
				method: 'POST',
				url: 'https://localhost:3443/api/document/create',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: { state: body },
			});
		} catch (err) {
			throw err.response.data.message;
		}
	};

	downloadPDF = async () => {
		try {
			const result = await axios ({
				method: 'GET',
				url: 'https://localhost:3443/api/document/fetch',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				responseType: 'blob',
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	}

	getWorkload = async () => {
		try {
			const result = await axios ({
				method: 'GET',
				url: 'https://localhost:3443/api/statistics/workload',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			return result.data.workload;
		} catch (err) {
			throw err.response.data.message;
		}
	}

	getProblemStatistics = async () => {
		try {
			const result = await axios ({
				method: 'GET',
				url: 'https://localhost:3443/api/statistics/problems',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			console.log(result.data.problems);
			return result.data.problems;
		} catch (err) {
			throw err.response.data.message;
		}
	}

	getProblemTypes = async () => {
		try {
			const result = await axios ({
				method: 'GET',
				url: 'https://localhost:3443/api/issue/issueTypes',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			console.log(result.data.problems);
			return result.data.problems;
		} catch (err) {
			throw err.response.data.message;
		}
	}

	createWorker = async (data) => {
		try {
			const result = await axios ({
				method: 'POST',
				url: 'https://localhost:3443/api/workers/createWorker',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: {
					startStatus: localStorage.getItem('startStatus'),
					...data,
				},
			});
			console.log(result.status);
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	}
};
