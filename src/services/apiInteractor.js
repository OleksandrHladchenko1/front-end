import axios from "axios";

export class APIInteractor {
  login = async (user) => {
    try {
			const result = await axios({
				method: 'post',
				url: 'http://localhost:8080/api/auth/login',
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
				url: 'http://localhost:8080/api/auth/register',
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
				url: `http://localhost:8080/api/users/me/${id}`,
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

	changePassword = async (passwords) => {
		try {
			const result = await axios({
				method: 'patch',
				url: 'http://localhost:8080/api/auth/changePassword',
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
				data: passwords,
			});
			return result;
		} catch (err) {
			throw err.response.data.message;
		}
	};

	getUserVisits = async (body) => {
		try {
			const result = await axios({
				method: 'get',
				url: `http://localhost:8080/api/userVisits/allUserVisits/${body.userId}`,
				headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
			}).then((data) => data.data.visits);
			return result;
		} catch (err) {
			console.log(err);
			throw err.response.data.message;
		}
	};
};
