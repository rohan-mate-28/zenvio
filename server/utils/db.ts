import mongoose from "mongoose";

export const connectdb=(onconnected?:()=>void)=>{
      const connectwithretry=()=>{
            mongoose.connect(process.env.MONGO_DB as string,{
                  serverSelectionTimeoutMS:30000,
                  socketTimeoutMS:50000
            }).then(()=>{
                  console.log("database connected");
                  if(onconnected) onconnected();
            }).catch((err)=>{
                  console.log("Error occuer databse concetion",err);
                  setTimeout(connectwithretry,5000)
            })
      }
      connectwithretry();
}
