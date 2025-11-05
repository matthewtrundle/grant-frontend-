"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, File, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: "pending" | "uploading" | "success" | "error";
  progress?: number;
  error?: string;
  url?: string;
}

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  onFilesChange?: (files: UploadedFile[]) => void;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  accept = ".pdf,.doc,.docx,.pptx,.txt",
  maxSize = 50, // 50MB default
  maxFiles = 5,
  onFilesChange,
  disabled = false,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type
    if (accept) {
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExt === type;
        }
        // Handle MIME types
        return file.type.match(new RegExp(type.replace("*", ".*")));
      });

      if (!isAccepted) {
        return `File type not accepted. Allowed: ${accept}`;
      }
    }

    return null;
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || disabled) return;

    const fileArray = Array.from(newFiles);

    // Check max files
    if (files.length + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const uploadedFiles: UploadedFile[] = fileArray.map((file) => {
      const error = validateFile(file);
      return {
        id: Math.random().toString(36).substring(7),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: error ? "error" : "pending",
        error: error || undefined,
      };
    });

    const updatedFiles = [...files, ...uploadedFiles];
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Drop Zone */}
      <div
        role="region"
        aria-label="File upload area"
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200",
          dragActive
            ? "border-purple-500 bg-purple-500/5"
            : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          aria-label="Upload files"
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
              dragActive ? "bg-purple-500/20" : "bg-white/10"
            )}
          >
            <Upload
              className={cn(
                "w-8 h-8 transition-colors",
                dragActive ? "text-purple-400" : "text-white/60"
              )}
            />
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">
            {dragActive ? "Drop 'em right here!" : "Got documents to share?"}
          </h3>

          <p className="text-sm text-white/60 mb-4">
            {dragActive ? "We'll take good care of them" : "Drag and drop, or click to choose files"}
          </p>

          <button
            type="button"
            onClick={onButtonClick}
            disabled={disabled}
            aria-label="Choose files to upload"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Choose Files
          </button>

          <p className="text-xs text-white/40 mt-4">
            Accepted: {accept.split(",").join(", ")} • Max {maxSize}MB per file • Up to {maxFiles}{" "}
            files
          </p>
        </div>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
            role="list"
            aria-label="Uploaded files"
            aria-live="polite"
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                role="listitem"
                aria-label={`${file.name}, ${formatFileSize(file.size)}, ${file.status}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <File className="w-5 h-5 text-white/60" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                  <p className="text-xs text-white/60">{formatFileSize(file.size)}</p>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  {file.status === "success" && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {file.status === "error" && (
                    <AlertCircle className="w-5 h-5 text-red-400" title={file.error} />
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="p-1 rounded-md hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
