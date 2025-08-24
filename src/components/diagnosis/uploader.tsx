import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
  isLoading?: boolean;
  className?: string;
}

export function Uploader({ onFileSelect, selectedFile, isLoading, className }: UploaderProps) {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: false,
    disabled: isLoading,
  });

  const handleCameraCapture = () => {
    // Trigger file input for camera on mobile
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onFileSelect(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const clearSelection = () => {
    setPreview(null);
    onFileSelect(null as any);
  };

  if (selectedFile && preview) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("space-y-4", className)}
      >
        <Card className="relative overflow-hidden">
          <img
            src={preview}
            alt="Selected crop"
            className="w-full h-64 object-cover"
          />
          {!isLoading && (
            <Button
              onClick={clearSelection}
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </Card>
        <div className="text-sm text-muted-foreground text-center">
          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      </motion.div>
    );
  }

  return (
    <Card className={cn("p-8", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
          isDragActive ? "border-krishi-primary bg-krishi-light/20" : "border-muted-foreground/25",
          isLoading && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-krishi-light/20 rounded-full">
            <Upload className="h-8 w-8 text-krishi-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {isDragActive
                ? "Drop the image here..."
                : t('diagnosis.upload')}
            </p>
            <p className="text-sm text-muted-foreground">
              Drag and drop or click to select crop images
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Choose File
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCameraCapture();
              }}
              variant="outline"
              className="gap-2 md:hidden"
            >
              <Camera className="h-4 w-4" />
              Camera
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Supports: JPG, PNG, WebP (Max 5MB)
          </p>
        </div>
      </div>
    </Card>
  );
}