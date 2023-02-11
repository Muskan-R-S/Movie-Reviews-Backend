import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next){ //how are these req and res getting passed 
        try {
            const movieId = parseInt(req.body.movieId) 
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.addReview(movieId,user,review)
            
            res.json({status: "Success"})
        } catch (e){
            res.status(500).json({ error: e.message}) //what is message here 
        }
    }

    static async apiGetReview(req, res, next){
        try{
            let id = req.params.id || {}
            let review = await ReviewsDAO.getReview(id)
            if (!review){
                res.status(404).json({ error: "Not Found" })
                return
            }
            res.json(review)
        }catch (e){
            console.log(`api, ${e}`)
            res.status(500).json({ error: e})
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.params.id
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review)

            var { error } = reviewResponse
            if(error){
                res.status(400).json( { error })
            }

            if (reviewResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update review",
                )
            }

            res.json({ status: "success" })

        } catch (e) {
            res.status(500).json({ error : e.message }) //what is 500 here
           
        }
    }

    static async apiDeleteReview(req, res, next){
        try {
            const reviewId = req.params.id
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
            
            res.json({ status: "success" })

        }catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetReviews(req, res, next)
    {
        console.log("************ NOw we will notice it Anything it should be long engough so we can notice it between logs Okay PKay this is still not noticable ***************")
        try{
            let id = req.params.id || {} //here id is the movie id so that we get all reviews of movies 
            let reviews = await ReviewsDAO.getReviewsByMovieId(id)
            if (!reviews) {
                res.status(404).json({ error: "Not Found" })
                return
            }
            res.json(reviews)  //return the reviews
        
        }catch (e) {
            console.log(`api , ${e}`)
            res.status(500).json({ error: e })

        }
    }

}