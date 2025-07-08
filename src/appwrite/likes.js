import conf from "../conf/conf";
import { Client, ID, Databases, Query } from 'appwrite';

export class LikeService{
     client = new Client();
    databases;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.databases=new Databases(this.client);
     }

     async toggleLikes({postId,userId,existingLikeId}){
        try {
            if(existingLikeId){
                await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteLikesId,existingLikeId)
                return {likeAppear : false}
            }else{
                const res = await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteLikesId,ID.unique(),{
                    postId,
                    userId,
                })
                return {likeAppear : true , likeId : res.$id}
            }
        } catch (error) {
            console.log("Error in adding likes : ",error)
        }
     }

     async listAllLikes(postId){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteLikesId,[
                Query.equal("postId",postId),
            ]);
        } catch (error) {
            console.log("Error in fetching likes : ",error)
            return { total: 0, documents: [] };
        }
    }
}

const likeService=new LikeService()
export default likeService;