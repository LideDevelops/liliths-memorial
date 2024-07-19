import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import sizeOf from "image-size";
import { GaleryImage } from "@/lib/definitions";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/galerie");

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    fs.writeFileSync(
      path.resolve(UPLOAD_DIR, (body.file as File).name),
      buffer
    );
  } else {
    return NextResponse.json({
      success: false,
    });
  }

  return NextResponse.json({
    success: true,
    name: (body.file as File).name,
  });
};



export function GET(req: NextRequest) {
  const directoryPath = path.join(process.cwd(), 'public', 'galerie');
  const files = fs.readdirSync(directoryPath).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

  const images: GaleryImage[] = files.map((file, index) => {
    const filePath = path.join(directoryPath, file);
    const dimensions = sizeOf(filePath); // Read the real image size

    return ({
      id: index.toString(),
      src: `/galerie/${file}`,
      alt: file.split('.')[0], // Use file name without extension as alt text
      width: dimensions.width ?? 600, // Real image width
      height: dimensions.height ?? 400, // Real image height
 
    });
  });

  return NextResponse.json({ images });
}