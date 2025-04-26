import { type NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
              { success: false, message: 'No file provided' },
              { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result: UploadApiResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { resource_type: 'auto' },
              (error, result) => {
                if (error) return reject(error);
                resolve(result as UploadApiResponse);
              }
            ).end(buffer);
        });

        console.log(result.secure_url);
        

        return NextResponse.json({
            success: true,
            url: result.secure_url
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: 'Upload failed' },
            { status: 500 }
        );
    }
}