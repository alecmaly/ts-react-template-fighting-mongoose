const Knex = require('knex')
const connection = require('../../../knexfile')['development']
const { Model } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)




class User extends Model {
  static get tableName () {
    return 'users'
  }

  static get relationMappings () {
    return {
      idea: {
        relation: Model.BelongsToOneRelation,
        modelClass: ExternalLogin,
        join: {
          from: 'users.id',
          to: 'external_logins.user_id'
        }
      }
    }
  }
}


class ExternalLogin extends Model {
  static get tableName () {
    return 'external_logins'
  }

  static get relationMappings () {
    return {
      idea: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'external_logins.user_id',
          to: 'users.id'
        }
      }
    }
  }
}






class Comment extends Model {
  static get tableName () {
    return 'comments'
  }

  static get relationMappings () {
    return {
      idea: {
        relation: Model.BelongsToOneRelation,
        modelClass: Idea,
        join: {
          from: 'comments.ideas_id',
          to: 'ideas.id'
        }
      }
    }
  }
}


class Idea extends Model {
  static get tableName () {
    return 'ideas'
  }

  static get relationMappings () {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'ideas.id',
          to: 'comments.ideas_id'
        }
      }
    }
  }
}

module.exports = { User, ExternalLogin, Idea, Comment }
