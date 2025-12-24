import { useState } from "react";
import { Camera, Upload, X } from "lucide-react";
import { getCurrentUser } from "@/services/supabase/user_details.service";
import { supabase } from "@/lib/supabase";

export default function ImageUpload({
  currentPhotoUrl,
  storageId,
  onPhotoChange,
}) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentPhotoUrl);

  const handleFileSelect = async (event) => {
    const user = await getCurrentUser();
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB");
      return;
    }

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(storageId)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from(storageId).getPublicUrl(data.path);

      setPreviewUrl(publicUrl);
      onPhotoChange(publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    onPhotoChange(null);
  };

  return (
    <div className="relative w-32 h-32">
      {previewUrl ? (
        <>
          <img
            src={previewUrl}
            alt="Pet preview"
            className="w-full h-full object-cover rounded-full border-4 border-gray-200"
          />
          {/* <button
            type="button"
            onClick={handleRemovePhoto}
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <X size={16} />
          </button> */}
        </>
      ) : (
        <div className="w-full h-full rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
          <Camera size={32} className="text-gray-400" />
        </div>
      )}

      <label
        htmlFor="photo-upload"
        className={`absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {uploading ? (
          <div className="animate-spin">⏳</div>
        ) : (
          <Camera size={20} />
        )}
      </label>

      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        className="hidden"
      />
    </div>
  );
}
