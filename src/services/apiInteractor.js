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
			if(result.status === 200) return result.data.user;
		} catch (err) {
			console.log(err);
		}
	};
};
