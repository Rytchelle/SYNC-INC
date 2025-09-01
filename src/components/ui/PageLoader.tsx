import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

interface PageLoaderProps {
  showHeader?: boolean;
  showCards?: boolean;
  showCharts?: boolean;
  showTable?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  showHeader = true,
  showCards = true,
  showCharts = true,
  showTable = true
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-8">
      {/* Header Skeleton */}
      {showHeader && (
        <div className="mb-8">
          <Skeleton variant="text" width="60%" height={40} className="mb-4" />
          <Skeleton variant="text" width="40%" height={24} />
        </div>
      )}

      {/* Cards Skeleton */}
      {showCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Skeleton variant="text" width="40%" height={20} className="mb-2" />
                    <Skeleton variant="text" width="60%" height={32} className="mb-2" />
                    <Skeleton variant="text" width="30%" height={16} />
                  </div>
                  <Skeleton variant="circular" width={48} height={48} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Charts Skeleton */}
      {showCharts && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {[1, 2].map((i) => (
            <Card key={i} className="shadow-lg">
              <CardContent className="p-6">
                <Skeleton variant="text" width="50%" height={24} className="mb-4" />
                <Box className="flex items-center justify-center" sx={{ height: 300 }}>
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Table Skeleton */}
      {showTable && (
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Skeleton variant="text" width="30%" height={24} className="mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="flex-1">
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="40%" height={16} />
                  </div>
                  <Skeleton variant="rectangular" width={80} height={24} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PageLoader; 