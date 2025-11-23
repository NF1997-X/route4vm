import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link, Image as ImageIcon, X, Edit2, Trash2, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MediaWithCaption } from "@shared/schema";

interface ImageUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingImages?: MediaWithCaption[];
  onSave: (images: MediaWithCaption[]) => void;
  maxImages?: number;
}

export function ImageUploadModal({ 
  open, 
  onOpenChange, 
  existingImages = [], 
  onSave,
  maxImages = 10 
}: ImageUploadModalProps) {
  const [images, setImages] = useState<MediaWithCaption[]>(existingImages);
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  const [urlInput, setUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadToImgBB = async (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const base64data = reader.result as string;
          const response = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64data, name: file.name }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Upload failed');
          }

          const result = await response.json();
          resolve(result.url);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const uploadUrlToImgBB = async (imageUrl: string): Promise<string> => {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image from URL');
    
    const blob = await response.blob();
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const base64data = reader.result as string;
          const uploadResponse = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64data, name: 'uploaded-image' }),
          });

          if (!uploadResponse.ok) {
            const error = await uploadResponse.json();
            throw new Error(error.error || 'Upload failed');
          }

          const result = await uploadResponse.json();
          resolve(result.url);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleUrlUpload = async () => {
    if (!urlInput.trim() || images.length >= maxImages) return;

    setIsUploading(true);
    try {
      toast({ title: "Uploading...", description: "Processing image URL" });
      
      const imgbbUrl = await uploadUrlToImgBB(urlInput.trim());
      
      const newImage: MediaWithCaption = {
        url: imgbbUrl,
        caption: "",
        type: "image"
      };

      setImages([...images, newImage]);
      setUrlInput("");
      
      toast({ 
        title: "Success", 
        description: "Image uploaded to ImgBB successfully!" 
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    if (filesToUpload.length === 0) {
      toast({
        title: "Limit Reached",
        description: `Maximum ${maxImages} images allowed`,
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      toast({
        title: "Uploading...",
        description: `Processing ${filesToUpload.length} image(s)`
      });

      const uploadedImages: MediaWithCaption[] = [];

      for (const file of filesToUpload) {
        const imgbbUrl = await uploadToImgBB(file);
        uploadedImages.push({
          url: imgbbUrl,
          caption: file.name.replace(/\.[^/.]+$/, ""),
          type: "image"
        });
      }

      setImages([...images, ...uploadedImages]);
      
      toast({
        title: "Success",
        description: `${uploadedImages.length} image(s) uploaded to ImgBB!`
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload images",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditCaption(images[index].caption || "");
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;
    
    const updatedImages = [...images];
    updatedImages[editingIndex] = {
      ...updatedImages[editingIndex],
      caption: editCaption
    };
    
    setImages(updatedImages);
    setEditingIndex(null);
    setEditCaption("");
  };

  const handleReplace = async (index: number) => {
    if (!urlInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image URL first",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      const imgbbUrl = await uploadUrlToImgBB(urlInput.trim());
      
      const updatedImages = [...images];
      updatedImages[index] = {
        ...updatedImages[index],
        url: imgbbUrl
      };
      
      setImages(updatedImages);
      setUrlInput("");
      
      toast({
        title: "Success",
        description: "Image replaced successfully!"
      });
    } catch (error) {
      toast({
        title: "Replace Failed",
        description: error instanceof Error ? error.message : "Failed to replace image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditCaption("");
    }
  };

  const handleSaveAll = () => {
    onSave(images);
    onOpenChange(false);
    setImages([]);
    setUrlInput("");
    setEditingIndex(null);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setImages(existingImages);
    setUrlInput("");
    setEditingIndex(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Image Manager
          </DialogTitle>
          <DialogDescription>
            Upload images to ImgBB (Max: {maxImages} images) • Current: {images.length}/{maxImages}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <Tabs value={uploadMethod} onValueChange={(v) => setUploadMethod(v as "url" | "file")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                URL Upload
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Device Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-3 mt-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Paste image URL here..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUrlUpload()}
                  disabled={isUploading || images.length >= maxImages}
                  className="flex-1"
                />
                <Button 
                  onClick={handleUrlUpload}
                  disabled={isUploading || !urlInput.trim() || images.length >= maxImages}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Upload"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="file" className="mt-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB • Multiple files supported
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  disabled={isUploading || images.length >= maxImages}
                  className="hidden"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                Uploaded Images ({images.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className="relative group border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900"
                  >
                    <img 
                      src={image.url} 
                      alt={image.caption || `Image ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                    
                    {/* Image Actions Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Caption */}
                    {editingIndex === index ? (
                      <div className="p-2 space-y-2">
                        <Textarea
                          value={editCaption}
                          onChange={(e) => setEditCaption(e.target.value)}
                          placeholder="Enter caption..."
                          className="text-xs min-h-[60px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            className="flex-1 h-7 text-xs"
                          >
                            <Save className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingIndex(null);
                              setEditCaption("");
                            }}
                            className="flex-1 h-7 text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {image.caption || "No caption"}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveAll}
              disabled={images.length === 0}
              className="bg-green-500 hover:bg-green-600"
            >
              Save All ({images.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
