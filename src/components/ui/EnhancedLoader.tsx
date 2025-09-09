import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { FaCog, FaSpinner, FaIndustry } from 'react-icons/fa';

interface EnhancedLoaderProps {
  type?: 'page' | 'component' | 'fullscreen' | 'inline';
  message?: string;
  progress?: number;
  animated?: boolean;
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
}

const EnhancedLoader: React.FC<EnhancedLoaderProps> = ({
  type = 'component',
  message = 'Carregando...',
  progress,
  animated = true,
  size = 'medium'
}) => {
  const getIconSize = () => {
    switch (size) {
      case 'small': return 'text-2xl';
      case 'large': return 'text-6xl';
      case 'medium':
      default: return 'text-4xl';
    }
  };

  const getContainerSize = () => {
    switch (size) {
      case 'small': return 'p-4';
      case 'large': return 'p-12';
      case 'medium':
      default: return 'p-8';
    }
  };

  const LoadingIcon = () => (
    <div className="relative">
      <FaIndustry 
        className={`${getIconSize()} text-[var(--primary)] mb-4 ${animated ? 'animate-pulse' : ''}`} 
      />
      <FaCog 
        className={`absolute -top-1 -right-1 text-lg text-[var(--accent)] ${animated ? 'animate-spin' : ''}`} 
      />
    </div>
  );

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center text-center">
      <LoadingIcon />
      
      <Typography 
        variant="h6" 
        className="text-[var(--text)] font-semibold mb-2"
      >
        {message}
      </Typography>
      
      {progress !== undefined && (
        <div className="w-full max-w-xs mb-4">
          <LinearProgress 
            variant="determinate" 
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'var(--accent)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'var(--primary)',
                borderRadius: 4,
              }
            }}
          />
          <Typography 
            variant="caption" 
            className="text-[var(--muted)] mt-1 block"
          >
            {Math.round(progress)}%
          </Typography>
        </div>
      )}
      
      <div className="flex gap-1 mt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 bg-[var(--primary)] rounded-full ${
              animated ? 'animate-bounce' : ''
            }`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );

  // Fullscreen Loader
  if (type === 'fullscreen') {
    return (
      <Box className="fixed inset-0 bg-gradient-to-br from-[var(--bg)] via-[var(--accent)] to-[var(--primary)/10] flex items-center justify-center z-50">
        <div className={`bg-white rounded-2xl shadow-2xl ${getContainerSize()} border border-[var(--accent)]`}>
          <LoadingContent />
        </div>
      </Box>
    );
  }

  // Page Loader
  if (type === 'page') {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-[var(--bg)] via-[var(--accent)] to-[var(--primary)/10] flex items-center justify-center">
        <div className={`bg-white rounded-2xl shadow-2xl ${getContainerSize()} border border-[var(--accent)] max-w-md w-full mx-4`}>
          <LoadingContent />
        </div>
      </Box>
    );
  }

  // Component Loader
  if (type === 'component') {
    return (
      <Box className="relative bg-transparent backdrop-blur-md rounded-lg shadow-lg border border-[var(--accent)]/30">
        <div className={`${getContainerSize()}`}>
          <LoadingContent />
        </div>
      </Box>
    );
  }

  // Inline Loader
  return (
    <div className="flex items-center gap-3 p-2">
      <FaSpinner className={`${animated ? 'animate-spin' : ''} text-[var(--primary)]`} />
      <Typography variant="body2" className="text-[var(--muted)]">
        {message}
      </Typography>
    </div>
  );
};

export default EnhancedLoader;
