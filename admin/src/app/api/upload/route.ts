import { NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_SECRET_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert File to Buffer and create a readable stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    // Extract MRN from filename (assuming filename format is "MRN.pdf")
    const mrn = file.name.split(".")[0];

    // Upload to Pinata
    const result = await pinata.pinFileToIPFS(stream, {
      pinataMetadata: {
        name: file.name,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });

    return NextResponse.json({
      success: true,
      ipfsCid: result.IpfsHash,
      mrn,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
