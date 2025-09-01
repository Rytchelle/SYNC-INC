import React, { useState, useRef } from 'react';
import { Typography, Box, Paper, LinearProgress, Chip, IconButton } from '@mui/material';
import { FaCloudUploadAlt, FaFile, FaTimes, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

interface FileInfo {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = '*',
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = false,
  disabled = false,
  className = '',
}) => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `Arquivo muito grande. Tamanho máximo: ${formatFileSize(maxSize)}`;
    }
    
    if (acceptedTypes !== '*' && !file.type.match(acceptedTypes.replace(/,/g, '|'))) {
      return `Tipo de arquivo não suportado. Tipos aceitos: ${acceptedTypes}`;
    }
    
    return null;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: FileInfo[] = [];
    const fileArray = Array.from(selectedFiles);

    fileArray.forEach((file) => {
      const error = validateFile(file);
      const fileInfo: FileInfo = {
        id: Date.now().toString() + Math.random(),
        file,
        progress: 0,
        status: error ? 'error' : 'uploading'
      };

      if (error) {
        fileInfo.error = error;
      }

      newFiles.push(fileInfo);
    });

    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    const limitedFiles = updatedFiles.slice(0, 1); // Only allow one file for now
    
    setFiles(limitedFiles);

    // Simular upload
    newFiles.forEach((fileInfo) => {
      if (fileInfo.status === 'uploading') {
        simulateUpload(fileInfo.id);
      }
    });

    // Chamar callback com arquivos válidos
    const validFiles = newFiles.filter(f => f.status !== 'error').map(f => f.file);
    if (validFiles.length > 0) {
      onFileSelect(validFiles[0]); // Assuming onFileSelect expects a single file
    }
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: 100, status: 'success' } : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }
    }, 200);
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const getStatusIcon = (status: FileInfo['status']) => {
    switch (status) {
      case 'success':
        return <FaCheck className="text-green-500" />;
      case 'error':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: FileInfo['status']) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        multiple={multiple}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={disabled}
      />

      <Paper
        className={`
          border-2 border-dashed p-6 text-center cursor-pointer transition-all
          ${isDragOver ? 'border-[var(--primary)] bg-[var(--primary)/5]' : 'border-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--primary)]'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <FaCloudUploadAlt className="text-4xl text-[var(--muted)] mx-auto mb-4" />
        <Typography variant="h6" className="text-[var(--text)] mb-2">
          Escolher arquivos
        </Typography>
        <Typography variant="body2" className="text-[var(--muted)]">
          Arraste arquivos aqui ou clique para selecionar
        </Typography>
        {acceptedTypes !== '*' && (
          <Typography variant="caption" className="text-[var(--muted)] block mt-2">
            Tipos aceitos: {acceptedTypes}
          </Typography>
        )}
        <Typography variant="caption" className="text-[var(--muted)] block">
          Tamanho máximo: {formatFileSize(maxSize)}
        </Typography>
      </Paper>

      {files.length > 0 && (
        <Box className="mt-4 space-y-2">
          {files.map((fileInfo) => (
            <Paper key={fileInfo.id} className="p-3">
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-3 flex-1">
                  <FaFile className="text-[var(--primary)]" />
                  <Box className="flex-1 min-w-0">
                    <Typography variant="body2" className="font-medium truncate">
                      {fileInfo.file.name}
                    </Typography>
                    <Typography variant="caption" className="text-[var(--muted)]">
                      {formatFileSize(fileInfo.file.size)}
                    </Typography>
                  </Box>
                </Box>
                
                <Box className="flex items-center gap-2">
                  {getStatusIcon(fileInfo.status)}
                  <Chip
                    label={fileInfo.status === 'uploading' ? 'Enviando...' : 
                           fileInfo.status === 'success' ? 'Enviado' : 'Erro'}
                    color={getStatusColor(fileInfo.status)}
                    size="small"
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveFile(fileInfo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </IconButton>
                </Box>
              </Box>
              
              {fileInfo.status === 'uploading' && (
                <LinearProgress
                  variant="determinate"
                  value={fileInfo.progress}
                  className="mt-2"
                />
              )}
              
              {fileInfo.error && (
                <Typography variant="caption" className="text-red-500 mt-1 block">
                  {fileInfo.error}
                </Typography>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FileUpload; 