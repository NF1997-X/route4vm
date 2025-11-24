import { Image, ImageOff } from "lucide-react";
import { MediaWithCaption } from "@shared/schema";

interface ImageIconButtonProps {
  images: MediaWithCaption[];
  rowId: string;
}

export function ImageIconButton({
  images,
  rowId,
}: ImageIconButtonProps) {
  const hasImages = images && images.length > 0;

  return (
    <div
      className={`flex items-center justify-center h-8 w-8 ${hasImages ? 'text-blue-500' : 'text-gray-400'}`}
      data-testid={`image-icon-${rowId}`}
      title={hasImages ? `${images.length} image(s)` : 'No images'}
    >
      {hasImages ? (
        <Image className="w-4 h-4" />
      ) : (
        <ImageOff className="w-4 h-4" />
      )}
    </div>
  );
}
