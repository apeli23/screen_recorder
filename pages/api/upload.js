var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
});
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "20mb",
        },
    },
};

export default async function handler(req, res) {
    let uploaded_url = ""
    const fileStr = req.body.data;

    if (req.method === "POST") {
        console.log("backend received", fileStr.length);
    }
}