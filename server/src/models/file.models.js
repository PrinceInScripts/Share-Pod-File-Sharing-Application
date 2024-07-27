import mongoose,{Schema} from "mongoose"

const fileSchema=new Schema({
    fileName:{
        type:string,
        required:true
    }
},{timestamps:true});

export default File=mongoose.model("File",fileSchema);