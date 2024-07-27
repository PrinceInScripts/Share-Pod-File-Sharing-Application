import mongoose,{Schema} from "mongoose"

const fileSchema=new Schema({
    filename: {
        type: String,
        required: true,
      },
      fileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
},{timestamps:true});

export const File=mongoose.model("File",fileSchema);