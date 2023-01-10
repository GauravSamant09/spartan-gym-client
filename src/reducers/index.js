import { combineReducers } from "redux";
import posts from './posts'
import auth from './auth'
import members from './members'
import payments from './payments'
import dashboard from './dashboard'

export default combineReducers({ posts, auth, members, payments, dashboard })