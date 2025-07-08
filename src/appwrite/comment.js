import conf from "../conf/conf";
import { Client, ID, Databases, Query } from 'appwrite';

export class CommentService{
     client = new Client();
    databases;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.databases=new Databases(this.client);
     }

     async createComment({postId,userId,content}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCommentId,ID.unique(),{
                postId,
                userId,
                content
            })
        } catch (error) {
            console.log("Error in creating comments : ",error)
        }
     }

     async listAllComments(postId){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCommentId,[
                Query.equal("postId",postId),
                Query.orderAsc("$createdAt")
            ]);
        } catch (error) {
            console.log("Error in fetching comments : ",error)
        }
    }
}

const commentService=new CommentService()
export default commentService;