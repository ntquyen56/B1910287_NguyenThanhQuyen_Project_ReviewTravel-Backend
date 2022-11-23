const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ReviewService = require("../services/review.service");
exports.create = async(req, res, next) => {
    if (!req.body?.title){
        return next(new ApiError(400,"Title cannot be empty"));
    }
    try {
        const ReviewServices = new ReviewService(MongoDB.client);
        const document = await ReviewServices.create(req.body); 
        return res.send(document);

    } catch (error){
        return next(
                error
            // new ApiError(500,"An error occured while creating the review")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const ReviewServices = new ReviewService(MongoDB.client);
        const { title } = req.query;
        if (title) {
            documents = await ReviewServices.findByName(title);
        } else {
            documents = await ReviewServices.find({});
        }
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while retrieving Reviews")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try{
        const ReviewServices = new ReviewService(MongoDB.client);
        const document = await ReviewServices.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};

exports.update = async(req, res, next) => {
    if (Object.keys(req.body).length === 0){
        return next (new ApiError(400, "Data to update can not be empty"));    
    }
    try {
        const ReviewServices = new ReviewService(MongoDB.client);
        const document = await ReviewServices.update(req.params.id, req.body);
        if (!document) {
            return next (new ApiError(404, "Review not found"));
        }
        return res.send({ message: "Review was updated successfully"});
    } catch (error) {
        return next (
            new ApiError(500, `Error updating Review with id=${req.params.id}`)
        );
    }
};

exports.delete = async(req, res, next) => {
    try {
        const ReviewServices = new ReviewService (MongoDB.client);
        const document = await ReviewServices.delete (req.params.id);
        if (!document) {
            return next (new ApiError(404, "Review not found"));
        }
        return res.send({ message: "Review was deleted successfully" });
    } catch (error) {
        return next (
            new ApiError (
                500,
                `Could not delete Review with id=${req.params.id}`
            )
        );
    }
};
exports.deleteAllSource  = async(req,res,next)=>{
    try {
        const ReviewServices = new ReviewService (MongoDB.client);
        const document = await ReviewServices.deleteAllSource (req.params.id);
      
        return res.send({ message: "Review was deleted successfully" });
    } catch (error) {
        return next (
            error
        );
    }
}
exports.findAllFavorite = async(_req, res, next) => {
    try {
        const ReviewServices = new ReviewService(MongoDB.client);
        const documents = await ReviewServices.findAllFavorite();
        return res.send(documents);
    }catch (error) {
        return next (
            new ApiError(
                500,
                "An error occurred while retrieving favorite Reviews"
            )
        );
    }
};

exports.deleteAll = async(req, res, next) => {
    try {
        const ReviewServices = new ReviewService(MongoDB.client);
        const deletedCount = await ReviewServices.deleteAll();
        return res.send ({
            message: `${deletedCount} Reviews were deleted successfully`, 
        });
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while removing all Reviews")
        );
    }
};

