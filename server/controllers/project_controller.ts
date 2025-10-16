import { Request, Response } from "express";
import { User } from "../models/User";
import { Project } from "../models/Project";
import { Payment } from "../models/Payment";

////Create a new Project
// This function creates a new project and associates it with a client.
export const createProject=async(req:Request,res:Response):Promise<void>=>{
      try{
            const{clientId,title,description,techStack,liveUrl,githubUrl,price,status,startDate,endDate}=req.body;
            const client=await User.findById(clientId);
            if(!client){
                  res.status(404).json({message:"Client not fountd",success:false});  
            }
            const newProject=await Project.create({
                  client:clientId,
                  title,
                  description,
                  techStack,
                  liveUrl,
                  githubUrl,
                  price,
                  status,
                  startDate,
                  endDate,
            });
                await newProject.populate("client", "name email phone role");

            await Payment.create({
                  client: clientId,
                  project:newProject._id,
                  amount:price,
                  type:'project',
                  paymentStatus:'pending',
            });
            res.status(201).json({
                  message:"Project Created Successfully",
                  success:true,
                  project:newProject
            });

      }catch(err){
            console.error("Error creting project:",err);
            res.status(500).json({message:"Error to create project"});
      }
}
//Get all projects
export const getALlProjects=async(req:Request,res:Response):Promise<void>=>{
      try{
            const projects =await Project.find().populate('client','name email phone role');
            res.status(200).json({
                  message:"All Projects",
                  success:true,
                  projects
            });
      }catch(err){
            console.log("Error getting all project:",err);
            res.status(500).json({message:"Error to get all Proejcts",success:false})
      }
}
//Update a Project

export const updateproject=async(req:Request,res:Response):Promise<void>=>{
      try{
            const {id}=req.params;
            const updates=req.body;
            const project=await Project.findByIdAndUpdate(id,updates,{new:true});
            if(!project){
                  res.status(404).json({
                        message:"Project Not FOund",
                        success:false
                  });
            }
            res.status(200).json({
                  message:"Project Updated Successfully",
                  success:true,
                  project
            });
      }catch(err){
            res.status(500).json({
                  message:"Falied to update Project",
                  success:false
            });
      }
}


//Delete A project
export const deleteProject=async(req:Request,res:Response):Promise<void>=>{
      try{
            const {id}=req.params;
            const project=await Project.findByIdAndDelete(id);
            if(!project){
                  res.status(404).json({
                        message:"Project not found",
                        success:false
                  });
                  return;
            }
            await Payment.deleteMany({project:id});
            res.status(200).json({
                  message:"Project Deleted Successfuly",
                  success:true
            });
      }catch(e){
            console.error("Error deleting project:",e);
            res.status(500).json({
                  messsage:"Error to delete project",
                  success:false
            })
      }
}


///this for client side get my project controller thay can see
export const getMyproject=async(req:Request,res:Response):Promise<void>=>{
      try{
            const clientid=req.user?._id;
            if(!clientid){
                  res.status(400).json({
                        message:"User not Found",
                        success:false,

                  });
                  return;
            }
            const projects=await Project.find({client:clientid}).populate('client','name email phone role');
            res.status(200).json({
                  message:"Your Projects",
                  success:true,
                  projects
            })
      }catch(err){
            console.error("Error getiing my Project",err);
            res.status(500).json({
                  message:"Error to get my project",
                  success:false
            });
      }
}