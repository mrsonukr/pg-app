import * as FileSystem from 'expo-file-system';

export const clearImageCache = async (): Promise<void> => {
  try {
    const cacheDir = FileSystem.cacheDirectory;
    if (cacheDir) {
      const files = await FileSystem.readDirectoryAsync(cacheDir);
      
      // Delete all image files in cache
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      const imageFiles = files.filter(file => 
        imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
      );
      
      for (const file of imageFiles) {
        await FileSystem.deleteAsync(`${cacheDir}${file}`, { idempotent: true });
      }
      
      console.log('Image cache cleared successfully');
    }
  } catch (error) {
    console.error('Error clearing image cache:', error);
  }
};

export const getCacheSize = async (): Promise<number> => {
  try {
    const cacheDir = FileSystem.cacheDirectory;
    if (cacheDir) {
      const files = await FileSystem.readDirectoryAsync(cacheDir);
      let totalSize = 0;
      
      for (const file of files) {
        const fileInfo = await FileSystem.getInfoAsync(`${cacheDir}${file}`);
        if (fileInfo.exists && fileInfo.size) {
          totalSize += fileInfo.size;
        }
      }
      
      return totalSize;
    }
    return 0;
  } catch (error) {
    console.error('Error getting cache size:', error);
    return 0;
  }
};

export const formatCacheSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 