const User = require('../models/user');
const axios = require('axios').default;

module.exports = getUsersApi = async (ids) => {
  const requests = ids.map((id) => axios.get(`https://reqres.in/api/users/${id}`));

  try {
    const result = await Promise.all(requests);

    result.map((res) => {
      const {id, email, first_name, last_name} = res.data.data;

      new User({
        id,
        email,
        first_name,
        last_name
      }).save();
    });
  } catch (error) {
    console.log(error);
  }
};
