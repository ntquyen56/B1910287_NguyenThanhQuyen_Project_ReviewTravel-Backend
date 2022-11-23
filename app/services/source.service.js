const { ObjectId } = require("mongodb");

class SourceService {
    constructor(client) {
        this.Source = client.db().collection("sources");
    }
    extractConactData(payload){
        const source = {
            link: payload.link,
        };
        Object.keys(source).forEach(
            (key)=> source[key] === undefined && delete source[key]
        );
        return source;
    }
    async find(filter){
        const cursor = await this.Source.find();
        return await cursor.toArray();
    }
    async create(payload) {

        try{

            const source = this.extractConactData(payload);
            console.log('source' + source);
            const result = await this.Source.findOneAndUpdate(
                source,
                { $set: {link: source.link}},
                { returnDocument: "after", upsert: true }
            );
            return result.value;
        }catch(e){
            console.log(e);
        }
    }

    async findById(id){
        return await this.Source.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }


    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Source.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        const result = await this.Source.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

}


module.exports = SourceService;