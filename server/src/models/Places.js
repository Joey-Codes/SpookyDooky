import mongoose from "mongoose";
import axios from "axios";
import FormData from "form-data";

const PlacesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    numRatings: { type: Number },
    address: { type: String, required: true, unique: true },
    img: { type: String },
    website: { type: String },
    lat: { type: Number },
    long: { type: Number },
    createdAt: { type: Date, default: Date.now },
});

PlacesSchema.pre("save", async function(next) {
    if (this.img && this.isModified("img")) {
        try {
            const response = await axios.get(this.img, { responseType: "arraybuffer" });
            const imageData = response.data;

            const formData = new FormData();
            formData.append("file", imageData, { filename: `${this.name}.jpg` });

            const cloudinaryResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
                formData,
                {
                    headers: formData.getHeaders(),
                    params: {
                        upload_preset: `${process.env.CLOUDINARY_UNSIGNED_PRESET}`,
                        folder: "Places_Thumbnails", 
                    },
                }
            );

            this.img = cloudinaryResponse.data.secure_url;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
        }
    }

    next();
});

export const PlacesModel = mongoose.model("places", PlacesSchema);

PlacesModel.createIndexes({ name: "text", address: "text", description: "text" });
