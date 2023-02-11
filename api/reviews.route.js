import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

//here we take movie id and get the reviews for that movie
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)
router.route("/new").post(ReviewsCtrl.apiPostReview)
//Id here refers to the review id 
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)


export default router

