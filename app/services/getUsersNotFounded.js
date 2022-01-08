const User = require('../models/user');
const axios = require('axios').default;

module.exports = getUsersApi = async (ids) => {
  Promise.all(
    ids.map(async (id) => {
      await axios
        .get(`https://reqres.in/api/users/${id}`)
        .then((res) => {
          if (res) {
            const {email, first_name, last_name} = res.data.data;

            new User({
              id,
              email,
              first_name,
              last_name
            }).save();
          }
        })
        .catch((err) => console.log(err.message));
    })
  );
};
