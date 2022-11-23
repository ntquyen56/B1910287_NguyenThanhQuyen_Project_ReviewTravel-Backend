const { ObjectId } = require("mongodb");

class ReviewService {
    constructor(client) {
        this.Review = client.db().collection("reviews");
    }
    extractConactData(payload){
        const review = {
            title: payload.title,
            body: payload.body,
            image: payload.image,
            favorite: payload.favorite,
            id_source:payload.id_source
        };
        Object.keys(review).forEach(
            (key)=> review[key] === undefined && delete review[key]
        );
        return review;
    }

    async create(payload) {
        const review = this.extractConactData(payload);
        const result = await this.Review.findOneAndUpdate(
            review,
            { $set: {favorite: review.favorite === true }},
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter){
        const cursor = await this.Review.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id){
        return await this.Review.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Review.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        const result = await this.Review.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async deleteAllSource(id_source){
        const result = await this.Review.deleteMany({
            id_source:id_source
        });
        return result.value;
    }
    async findAllFavorite(){
        return await this.find ({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Review.deleteMany({});
        return result.deletedCount;
    }

}


module.exports = ReviewService;