const router = require("express").Router()
const dashboard_controller = require("../controllers/dashboard_controller")
const delete_account = require("../controllers/delete_account")
const get_user_controller_handler = require("../controllers/get_user_controller")
const pair_user_handler = require("../controllers/pair_users")
const setup_profile = require("../controllers/setup_profile.controller")
const sign_in_controller = require("../controllers/sign_in_controller")
const sign_up_controller = require("../controllers/sign_up_controller")

// User Authentication 

router.route("/sign-up").post(sign_up_controller)
router.route("/sign-in").post(sign_in_controller)
router.route("/dashboard").get(dashboard_controller)
router.route("/setup_profile").put(setup_profile)
router.route("/delete_account").delete(delete_account)
router.route("/pair_user").post(pair_user_handler)
router.route("/get_user/:id").get(get_user_controller_handler)

module.exports = router