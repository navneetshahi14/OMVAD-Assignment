import mongoose from 'mongoose'

const MongooseUri = process.env.MONGODB_URI;

if(!MongooseUri){
    throw new Error("Mongoose uri not provided correctly");
}


let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn:null,promise:null};
}


async function dbConnect() {
    if (cached.conn) return cached.conn;
  
    if (!cached.promise) {
      cached.promise = mongoose.connect(MongooseUri, {
        bufferCommands: false,
      }).then((mongoose) => {
        console.log('MongoDB connected');
        return mongoose;
      });
    }
  
    cached.conn = await cached.promise;
    return cached.conn;
  }
  
  export default dbConnect;
