const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://localhost:27017/raz', {}) //useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true
.then( () => console.log('connection successful...') ).catch( (err) => console.log(err) );

//Schema
 
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        unique: true,
        lowercase:true,
        // uppercase:true,
        trim: true,
        // minlength:2,
        minlength: [2, 'minimum 2letters'],
        maxlength:10,
    },
    ctype : {
        type: String,
        required : true,
        lowercase:true,
        enum: ["frontend", "backend", "database"]
    },
    videos : {
        type: Number,
        validate(value){
            if(value<0){
                throw new Error('videos count should not be negative');
            }
        }

        // validate: {
        //     validator: function(value){
        //         return value.length < 0
        //     },
        //     message: 'videos count should not be negative'
        // }
    },
    author : String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    active : Boolean,
    date : {
        type: Date,
        default: Date.now
    }
})

// model or collecrtion creation

const Playlist = new mongoose.model("Playlist", playlistSchema);

// create document or insert

const createDocument = async () => {
    try {
        const javaScriptPlaylist = new Playlist({
            name: "JavaScript",
            ctype : "Front End",
            videos : 90,
            author : "Thapa Technical",
            active : true,
        })

        const expressPlaylist = new Playlist({
            name: "Express Js",
            ctype : "Back End",
            videos : 20,
            author : "Thapa Technical",
            active : true,
        })

        const mongodbPlaylist = new Playlist({
            name: "mongoDB",
            ctype : "Database",
            videos : 50,
            author : "Thapa Technical",
            active : true,
        })

        const mongoosePlaylist = new Playlist({
            name: "Hava",
            ctype : "database",
            videos : 5,
            author : "Thapa Technical",
            email: "thapa@gmail.co",
            active : true,
        })

        const htmlPlaylist = new Playlist({
            name: "HTML",
            ctype : "Front End",
            videos : 50,
            author : "Thapa Technical",
            active : true,
        })
        
        // reactPlaylist.save().then( () => console.log('doc save successfully') );
        
        // const result = await reactPlaylist.save();
        // const result = await Playlist.insertMany([javaScriptPlaylist, expressPlaylist, mongodbPlaylist, mongoosePlaylist, htmlPlaylist]);
        const result = await Playlist.insertMany([ mongoosePlaylist]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
    
}

createDocument();


//read database

const getDocument = async()=>{
   try{
    // const result = await Playlist.find({ctype : "Front End"}).select({name:1}).limit(1);
    // const result = await Playlist.find({videos : 50}).select({name:1});
    // const result = await Playlist.find({videos : {$lte: 50}}).select({name:1});
    // const result = await Playlist.find({ctype : {$in: ['Back End', 'Database']}}).select({name:1});
    // const result = await Playlist.find({ctype : {$nin: ['Back End', 'Database']}}).select({name:1});
    // const result = await Playlist.find({$or: [ {ctype: "Back End"}, {author: "Thapa Technical"}]}).select({name:1});
    // const result = await Playlist.find({$and: [ {ctype: "Back End"}, {author: "Thapa Technical"}]}).select({name:1});
    // const result = await Playlist.find({$nor: [ {ctype: "Back End"}, {author: "Thapa Technical"}]}).select({name:1});
//    const result = await Playlist.find({$and : [{ctype: "Back End"}, {author: "Thapa Technical"}]}).select({name:1}).count();
// const result = await Playlist.find({$and : [{ctype: "Back End"}, {author: "Thapa Technical"}]}).select({name:1}).countDocuments();
    // const result = await Playlist.find({author: "Thapa Technical"}).select({name:1}).sort({name:1});
    // const result = await Playlist.find({author: "Thapa Technical"}).select({name:1}).collation({ locale: "en" }).sort({name:-1});
    // const result = await Playlist.find({author: "Thapa Technical"}).select({name:1}).collation({ locale: "en" }).sort({name:1});
   console.log(result);
   }
   catch(err){
    console.log(err);
   }
}

// getDocument();

//update the database
const updateDocument = async(_id) => {
    try{
        // const result = await Playlist.updateOne({_id },{$set: {name: "MongoDB"}});
        // const result = await Playlist.findByIdAndUpdate({_id },{$set: {name: "MongoDB Raz"}});
        const result = await Playlist.findByIdAndUpdate({_id },{$set: {name: "MongoDB"}},{new : true, useFindAndModify: false});
        console.log(result);
    } catch(err){
        console.log(err);
    }
}

// updateDocument("637f788f7f2052b398f0a0c4");


//delete the document

const deleteDocument = async(_id) => {
    try{
        // const result = await Playlist.deleteOne({_id});
        const result = await Playlist.findByIdAndDelete({_id});
        console.log(result);
    } catch(err){
        console.log(err)
    }
}

// deleteDocument("6381fe2736b181e3cae9f35b");


//validation