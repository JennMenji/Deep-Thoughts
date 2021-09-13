const { User, Thought } = require("../models");

const resolvers = {
  Query: {
    // to get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },

    // to get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },

    // to get all thoughts
    thoughts: async (parents, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },

    // to get a single thought
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
  },
};

module.exports = resolvers;
