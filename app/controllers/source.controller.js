const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const SourceService = require("../services/source.service");

exports.create = async (req, res, next) => {

    try {
        const SourceServices = new SourceService(MongoDB.client);
        const document = await SourceServices.create(req.body);
        return res.send(req.body);
    } catch (error) {
        return next(
            error
            // new ApiError(500,"An error occured while creating the review")
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const SourceServices = new SourceService(MongoDB.client);
        const document = await SourceServices.findById(req.params.id);
        return res.send(document);

        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            error
            // new ApiError(
            //     500,
            //     `Error retrieving contact with id=${req.params.id}`
            // )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const SourceServices = new SourceService(MongoDB.client);
        const document = await SourceServices.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Review not found"));
        }
        return res.send({ message: "Review was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating Review with id=${req.params.id}`)
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const SourceServices = new SourceService(MongoDB.client);

        documents = await SourceServices.find();
        console.log(documents);
        return res.send(documents);

    } catch (error) {
        return next(
            error
            // new ApiError(500, "An error occurred while retrieving Reviews")
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const SourceServices = new SourceService(MongoDB.client);
        const document = await SourceServices.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Review not found"));
        }
        return res.send({ message: "Review was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete Review with id=${req.params.id}`
            )
        );
    }
};

// exports.findAllFavorite = async(_req, res, next) => {
//     try {
//         const ReviewServices = new ReviewService(MongoDB.client);
//         const documents = await ReviewServices.findAllFavorite();
//         return res.send(documents);
//     }catch (error) {
//         return next (
//             new ApiError(
//                 500,
//                 "An error occurred while retrieving favorite Reviews"
//             )
//         );
//     }
// };

// exports.deleteAll = async(req, res, next) => {
//     try {
//         const ReviewServices = new ReviewService(MongoDB.client);
//         const deletedCount = await ReviewServices.deleteAll();
//         return res.send ({
//             message: `${deletedCount} Reviews were deleted successfully`,
//         });
//     } catch (error){
//         return next (
//             new ApiError(500, "An error occurred while removing all Reviews")
//         );
//     }
// };

