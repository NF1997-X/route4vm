import { Button } from "@/components/ui/button";
import { Image, ImageOff } from "lucide-react";
import { MediaWithCaption } from "@shared/schema";

interface ImageIconButtonProps {
  images: MediaWithCaption[];
  rowId: string;
  onClick: () => void;
}

export function ImageIconButton({
  images,
  rowId,
  onClick,
}: ImageIconButtonProps) {
  const hasImages = images && images.length > 0;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`h-8 w-8 p-0 ${hasImages ? 'text-blue-500 hover:text-blue-600' : 'text-gray-400 hover:text-gray-500'}`}
      data-testid={`image-button-${rowId}`}
      title={hasImages ? `${images.length} image(s)` : 'No images'}
    >
      {hasImages ? (
        <Image className="w-4 h-4" />
      ) : (
        <ImageOff className="w-4 h-4" />
      )}
    </Button>
  );
}
