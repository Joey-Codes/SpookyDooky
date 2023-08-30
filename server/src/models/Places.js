import mongoose from "mongoose";
import axios from "axios";
import FormData from "form-data";
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

async function accessSecret(secretName) {
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
      name: secretName,
    });
  
    return version.payload.data.toString();
  }

const mongoPassword = await accessSecret('projects/904458328495/secrets/MONGODB_PASSWORD/versions/latest');
const cloudinaryName = await accessSecret('projects/904458328495/secrets/CLOUDINARY_NAME/versions/latest');
const cloudinaryUnsignedPreset = await accessSecret('projects/904458328495/secrets/CLOUDINARY_UNSIGNED_PRESET/versions/latest');

mongoose.connect(`mongodb+srv://admin:${mongoPassword}@data.emedzou.mongodb.net/Data?retryWrites=true&w=majority`);

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
                `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
                formData,
                {
                    headers: formData.getHeaders(),
                    params: {
                        upload_preset: `${cloudinaryUnsignedPreset}`,
                        folder: "Places_Thumbnails",
                    },
                }
            ).catch(error => {
                console.error("Error uploading image to Cloudinary:", error);
            });

            this.img = cloudinaryResponse.data.secure_url;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
        }
    }

    next();
});

export const PlacesModel = mongoose.model("places", PlacesSchema);

PlacesModel.createIndexes({ name: "text", address: "text" });

