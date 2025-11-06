"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileUpload, UploadedFile } from "@/components/ui/file-upload";
import { useAuth, useUser } from "@clerk/nextjs";
import { Trash2, Download, Eye, FolderOpen, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function VaultPage() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFilesChange = async (files: UploadedFile[]) => {
    setUploadedFiles(files);

    // Auto-upload new files
    const newFiles = files.filter(f => f.status === "pending");
    if (newFiles.length > 0) {
      await uploadFiles(newFiles);
    }
  };

  const uploadFiles = async (files: UploadedFile[]) => {
    setIsUploading(true);
    try {
      const token = await getToken();
      const formData = new FormData();

      files.forEach(uploadedFile => {
        if (uploadedFile.file) {
          formData.append("files", uploadedFile.file);
        }
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/stage1/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Upload successful! 🚀",
          description: `${files.length} file(s) uploaded to your vault.`,
        });

        // Update file statuses
        const updatedFiles = uploadedFiles.map(f => {
          const uploadedFile = result.uploaded_files.find((uf: any) => uf.filename === f.name);
          if (uploadedFile) {
            return { ...f, status: "success" as const, url: uploadedFile.url };
          }
          return f;
        });
        setUploadedFiles(updatedFiles);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== id);
    setUploadedFiles(updatedFiles);

    toast({
      title: "File removed",
      description: "File has been removed from your vault.",
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="secondary" className="gap-1.5">
            <FolderOpen className="w-3.5 h-3.5" />
            Document Vault
          </Badge>
          <h1 className="text-3xl font-bold text-white">Your Documents</h1>
        </div>
        <p className="text-white/70">
          Upload and manage pitch decks, technical specs, financials, and any other supporting documents.
          Our AI agents scan these to better understand your innovation and find relevant grants.
        </p>
      </div>

      {/* Upload Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Upload Documents
          </CardTitle>
          <CardDescription>
            Drop your non-confidential docs here. Accepted: PDFs, PowerPoints, Word docs, pitch decks, product specs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload
            accept=".pdf,.doc,.docx,.pptx,.txt"
            maxSize={50}
            maxFiles={10}
            onFilesChange={handleFilesChange}
            disabled={isUploading}
          />

          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Uploaded Files ({uploadedFiles.length})
              </p>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {file.status === "success" && (
                        <>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <Download className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Why upload documents?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-0.5">✓</span>
              <div>
                <strong className="text-gray-900">Better AI matching:</strong> Our agents analyze your docs to understand your technology, market position, and team credentials
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-0.5">✓</span>
              <div>
                <strong className="text-gray-900">Faster grant writing:</strong> We extract key information to pre-populate grant application sections
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-0.5">✓</span>
              <div>
                <strong className="text-gray-900">Secure storage:</strong> All files are encrypted and only accessible by you and our AI agents
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
