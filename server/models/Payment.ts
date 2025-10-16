import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document{

      client:mongoose.Types.ObjectId;
      project:mongoose.Types.ObjectId;
      amount:number;
      type:'project';
      paymentStatus:'pending'|'paid'|'failed';
      razorpayOrderId?:string;
      razorpayPaymentId?:string;
      paymentDate:Date
}
const paymentSchema=new Schema<IPayment>({
      client:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
      },
      project:{
            type:mongoose.Schema.ObjectId,
            ref:'Project',
            required:true
      },
      amount:{
            type:Number,
            required:true
      },
      paymentStatus:{
            type:String,
            enum:['pending','paid','failed'],
            default:'pending'
      },
      type:{
            type:String,
            enum:['project'],
            required:true
      },
      razorpayOrderId: String,
    razorpayPaymentId: String,
    paymentDate:{
      type:Date,
      default:Date.now
    }
},{timestamps:true});
export const Payment=mongoose.model<IPayment>('Payment',paymentSchema);