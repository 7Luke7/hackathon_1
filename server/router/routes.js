const router = require("express").Router()
const dashboard_controller = require("../controllers/dashboard_controller")
const delete_account = require("../controllers/delete_account")
const get_connections = require("../controllers/get_connections")
const get_user_controller_handler = require("../controllers/get_user_controller")
const pair_user_handler = require("../controllers/pair_users")
const send_connection = require("../controllers/send_connection")
const setup_profile = require("../controllers/setup_profile.controller")
const sign_in_controller = require("../controllers/sign_in_controller")
const sign_up_controller = require("../controllers/sign_up_controller")
const accept_connection = require("../controllers/accept_connection")
const delete_connection = require("../controllers/delete_connection")
const get_friends = require("../controllers/get_friends")
// User Authentication 

router.route("/sign-up").post(sign_up_controller)
router.route("/sign-in").post(sign_in_controller)
router.route("/dashboard").get(dashboard_controller)
router.route("/setup_profile").put(setup_profile)
router.route("/delete_account").delete(delete_account)
router.route("/pair_user").post(pair_user_handler)
router.route("/get_user/:id").get(get_user_controller_handler)
router.route("/send_connection").post(send_connection)
router.route("/get_connections").get(get_connections)
router.route("/accept_connection/:id").put(accept_connection)
router.route("/delete_connection/:id").delete(delete_connection)
router.route("/get_friends").get(get_friends)

module.exports = router