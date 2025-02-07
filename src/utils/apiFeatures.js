

class apiFeatures {
    constructor(queryString, mongooseQuery){
        this.queryString = queryString
        this.mongooseQuery = mongooseQuery
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.toString().split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
        } else {
            this.mongooseQuery.sort('-createdAt')
        }
        return this
    }
    filter(){
        let filterObj = {}
        filterObj = {...this.queryString}
        const features = ['page','limit','sort','keyword','fields']
        features.forEach(ele => delete filterObj[ele])
        
        let queryStr = JSON.stringify(filterObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this;
    }
    search(model){
        if(this.queryString.keyword){
            const keywords = this.queryString.keyword
            if(model === 'productModel'){
                this.mongooseQuery.find({$or:[
                    {title:{$regex:keywords, $options : 'i'}},
                    {description:{$regex:keywords, $options : 'i'}}]})
            } else {
                this.mongooseQuery.find({name:{$regex:keywords,$options:'i'}})
            }
        } else {
            this.mongooseQuery.find()
        }
        return this
    }
    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.toString().split(',').join(' ')
            this.mongooseQuery.select(fields)
        } else {
            this.mongooseQuery.select('-__v')
        }
        return this
    }
    paginate(countDocuments){
        const page = +this.queryString.page || 1
        const limit = +this.queryString.limit || 5
        const skip = (page - 1) * limit
        const endIndex=page*limit

        const paginateFeatures = {}
        paginateFeatures.pagesNumber = countDocuments
        paginateFeatures.currentPage = page
        paginateFeatures.limit = limit
        paginateFeatures.totalPages = Math.ceil(paginateFeatures.pagesNumber / limit)
        if (endIndex < countDocuments) {
            paginateFeatures.next = page + 1
        }
        if (skip > 0) {
            paginateFeatures.previous = page - 1
        }
        this.paginateFeatures = paginateFeatures
        this.mongooseQuery.limit(limit).skip(skip)
        return this;
    }
}


module.exports = apiFeatures