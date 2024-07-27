import mongoose,{Schema} from "mongoose"

const fileSchema=new Schema({
    path: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      type:{
        type:String,
        required:true,
      },
      size:{
        type:Number,
        required:true
      },
      downloadedContent:{
        type:Number,
        required:true,
        default:0
      }
},{timestamps:true});

export const File=mongoose.model("File",fileSchema);