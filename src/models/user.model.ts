'use strict';

// import { Schema } from 'mongoose';

export const user = {
  collection: 'users',
  schema: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },

  methods: {},

  statics: {},
};
