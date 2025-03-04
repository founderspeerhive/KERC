"use client";

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { registerMedicalRecord, registerBulkRecords } from "@/lib/contracts";
import { Progress } from "@/components/ui/progress";

const BATCH_SIZE = 100; // Match with smart contract MAX_BATCH_SIZE

export default function UploadMedicalRecords() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [totalBatches, setTotalBatches] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      // Validate file types
      const invalidFiles = Array.from(selectedFiles).filter(
        file => file.type !== "application/pdf"
      );

      if (invalidFiles.length > 0) {
        toast.error("Please upload PDF files only");
        return;
      }

      setFiles(selectedFiles);
      const numBatches = Math.ceil(selectedFiles.length / BATCH_SIZE);
      setTotalBatches(numBatches);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast.error("Please select PDF files to upload");
      return;
    }

    if (typeof window === "undefined" || !window.ethereum) {
      toast.error("Please install MetaMask to use this feature");
      return;
    }

    setUploading(true);
    setProgress(0);
    setCurrentBatch(0);
    
    try {
      // Request MetaMask connection first
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const fileArray = Array.from(files);
      const totalFiles = fileArray.length;
      
      // Process files in batches
      for (let i = 0; i < totalFiles; i += BATCH_SIZE) {
        setCurrentBatch(Math.floor(i / BATCH_SIZE) + 1);
        const batch = fileArray.slice(i, i + BATCH_SIZE);
        
        // Upload files to Pinata
        const uploadPromises = batch.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Upload failed");
          }

          return response.json();
        });

        const results = await Promise.all(uploadPromises);
        
        // Register batch in smart contract
        const mrns = results.map(r => r.mrn);
        const ipfsCids = results.map(r => r.ipfsCid);
        
        try {
          await registerBulkRecords(mrns, ipfsCids);
          const progress = Math.min(((i + batch.length) / totalFiles) * 100, 100);
          setProgress(progress);
        } catch (error: any) {
          console.error("Smart contract error:", error);
          if (error.message?.includes("user rejected")) {
            toast.error("Transaction was rejected. Please approve the transaction in MetaMask.");
          } else {
            toast.error("Failed to register records in smart contract. Please make sure you're connected to Sepolia network.");
          }
          throw error;
        }
      }

      toast.success("All files have been uploaded to Pinata and registered in the smart contract");
      setFiles(null);
      setProgress(100);
    } catch (error: any) {
      console.error("Upload error:", error);
      if (!error.message?.includes("user rejected")) {
        toast.error("An error occurred during upload");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Medical Records</CardTitle>
          <CardDescription>
            Upload PDF medical records to be stored securely on IPFS via Pinata and registered in the smart contract
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="records">Medical Records (PDF only)</Label>
            <Input
              id="records"
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {files && (
              <div className="text-sm text-muted-foreground mt-2">
                Selected files: {files.length} files
              </div>
            )}
            {uploading && (
              <div className="space-y-2 mt-4">
                <Progress value={progress} className="w-full" />
                <div className="text-sm text-muted-foreground">
                  Processing batch {currentBatch} of {totalBatches}
                </div>
              </div>
            )}
            <Button
              className="mt-4"
              onClick={handleUpload}
              disabled={!files || uploading}
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4 animate-spin" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Records
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
