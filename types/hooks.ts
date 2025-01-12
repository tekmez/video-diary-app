export interface UseVideoTrimmerProps {
    currentVideo: string | null;
    onChange: (uri: string) => void;
  }
  
export interface UseVideoTrimmerReturn {
    startTime: number;
    endTime: number;
    trimmedVideo: string | null;
    isPending: boolean;
    handleScrubChange: (values: [number, number]) => void;
    trimVideo: () => void;
  }


export interface UseVideoUploaderProps {
    onChange: (uri: string) => void;
    initialValue?: string;
  }
  
export interface UseVideoUploaderReturn {
    currentVideo: string | null;
    videoDuration: number;
    pickVideo: () => Promise<void>;
    handleReset: () => void;
  }