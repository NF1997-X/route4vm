import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ImageData {
  url: string;
  caption?: string;
  thumbnail?: string;
  type?: "image" | "video";
}

interface ImageManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rowId: string;
  location?: string;
  images: ImageData[];
  onAddImage: UseMutationResult<any, Error, { rowId: string; imageUrl: string; caption?: string; thumbnail?: string }, unknown>;
  onUpdateImage: UseMutationResult<any, Error, { rowId: string; imageIndex: number; imageUrl?: string; caption?: string; thumbnail?: string }, unknown>;
  onDeleteImage: UseMutationResult<any, Error, { rowId: string; imageIndex?: number }, unknown>;
}

// ImgBB API Configuration
const IMGBB_API_KEY = '4042c537845e8b19b443add46f4a859c';
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

export function ImageManagementModalSimple({
  open,
  onOpenChange,
  rowId,
  location,
  images,
  onAddImage,
  onUpdateImage,
  onDeleteImage,
}: ImageManagementModalProps) {
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setImageUrl("");
      setCaption("");
      setActiveTab('url');
    }
  }, [open]);

  // Upload to ImgBB
  const uploadToImgBB = async (base64Image: string): Promise<string> => {
    const formData = new FormData();
    formData.append('image', base64Image.split(',')[1]);
    formData.append('key', IMGBB_API_KEY);

    const response = await fetch(IMGBB_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error('Upload failed');
    }
  };

  // Handle file selection
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 32MB for ImgBB)
    if (file.size > 32 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Image size must be less than 32MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          const uploadedUrl = await uploadToImgBB(base64String);
          setImageUrl(uploadedUrl);
          
          toast({
            title: "Upload Success",
            description: "Image uploaded successfully to ImgBB.",
          });
        } catch (error) {
          toast({
            title: "Upload Failed",
            description: "Failed to upload image. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsUploading(false);
      toast({
        title: "Error",
        description: "Failed to read file.",
        variant: "destructive",
      });
    }
  };

  // Handle Add Image
  const handleAddImage = async () => {
    if (!imageUrl) {
      toast({
        title: "Error",
        description: "Please provide an image URL or upload an image.",
        variant: "destructive",
      });
      return;
    }

    try {
      await onAddImage.mutateAsync({
        rowId,
        imageUrl,
        caption: caption || undefined,
      });

      toast({
        title: "Success",
        description: "Image added successfully.",
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add image.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black/95 border border-white/10 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">
            Add Image - {location}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'url' | 'upload')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 rounded-xl mb-6">
            <TabsTrigger 
              value="url" 
              className="rounded-lg data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/60"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              URL
            </TabsTrigger>
            <TabsTrigger 
              value="upload"
              className="rounded-lg data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/60"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </TabsTrigger>
          </TabsList>

          {/* URL Tab */}
          <TabsContent value="url" className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">Image URL</label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">Caption (Optional)</label>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter image caption..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
              />
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">Upload Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-white/40" />
                <p className="text-white/60 text-sm">
                  {isUploading ? "Uploading..." : "Click to select image"}
                </p>
                <p className="text-white/40 text-xs mt-2">Max size: 32MB</p>
              </div>
            </div>

            {imageUrl && (
              <div className="relative">
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 p-1 bg-black/80 rounded-full hover:bg-black"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">Caption (Optional)</label>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter image caption..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Preview existing images */}
        {images.length > 0 && (
          <div className="mt-6 border-t border-white/10 pt-4">
            <h3 className="text-sm font-medium text-white/80 mb-3">Existing Images ({images.length})</h3>
            <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
              {images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img 
                    src={img.thumbnail || img.url} 
                    alt={img.caption || `Image ${idx + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      if (confirm('Delete this image?')) {
                        onDeleteImage.mutate({ rowId, imageIndex: idx });
                      }
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent border-white/20 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddImage}
            disabled={!imageUrl || isUploading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
