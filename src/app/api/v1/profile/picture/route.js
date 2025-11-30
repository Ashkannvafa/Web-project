import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `profile-${Date.now()}.webp`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore error if directory exists
        }

        // Process image with sharp
        // Resize to 500x500 square, center crop, convert to webp
        const processedImageBuffer = await sharp(buffer)
            .resize(500, 500, {
                fit: 'cover',
                position: 'center'
            })
            .webp({ quality: 80 })
            .toBuffer();

        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, processedImageBuffer);

        const imageUrl = `/uploads/${filename}`;

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
