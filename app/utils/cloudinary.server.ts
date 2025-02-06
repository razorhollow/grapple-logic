import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File) {
    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const fileUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
        folder: 'technique-references', // Optional: organize uploads in folders
    });

    return result.secure_url;
}

export function getOptimizedImageUrl(url: string, width = 800) {
    // Example transformation: w_800,f_auto,q_auto
    return url.replace('/upload/', `/upload/w_${width},f_auto,q_auto/`);
}