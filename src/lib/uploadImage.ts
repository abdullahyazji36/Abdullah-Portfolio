import cloudinary from "@/lib/cloudinary";

export async function uploadImage(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "portfolio/projects",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    if (!result) {
                        reject(new Error("Cloudinary upload failed"));
                        return;
                    }

                    resolve(result as { secure_url: string });
                }
            );

            uploadStream.end(buffer);
        }
    );

    return result.secure_url;
}