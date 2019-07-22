
const express = require('express')
const { User, ExternalLogin } = require('../../db/models/schema')
const router = express.Router()



module.exports = {
	login: (req, res) => {
		const { user } = req

		res.json(user)
	},

	logout: (req, res, next) => {
		req.session.destroy((err) => {
			if(err) return next(err)

			req.logout()

			res.sendStatus(200)
		})
	},

	ping: function(req, res) {
		res.sendStatus(200)
  },






  findOrCreateExternalUser: async function(searchUser) {
    let user_obj = {}
    let user
    try {
      // found user
      user = await ExternalLogin.query().findOne(searchUser)

      if (user !== undefined) {
        user_obj.id = user.user_id
      } else {
        // did not find user - create new
        user = await User.query().insertAndFetch(
          { username: `${searchUser.provider}:${searchUser.provider_id}`}
        )
        user_obj.id = user.id
        // insert new external user
        user = await ExternalLogin.query().insertAndFetch({
          ...searchUser,
          username: `${searchUser.provider}:${searchUser.provider_id}`,
          user_id: user_obj.id
        })
      }

      console.log('found')
    } catch (e) {
      // user does not exist
      // insert new user
      console.log('error with account: ' + e)
    }

    return user_obj
  }
}
