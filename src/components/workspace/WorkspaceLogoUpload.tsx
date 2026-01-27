import { ImagePlus } from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

interface WorkspaceLogoUploadProps {
  onFileSelect?: (file: File) => void;
  label?: string;
}

export function WorkspaceLogoUpload({
  onFileSelect,
  label = "Workspace Logo (Optional)",
}: WorkspaceLogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onFileSelect?.(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-gray-900  text-sm font-semibold leading-normal uppercase tracking-wider">
        {label}
      </h3>
      <div className="flex flex-col">
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center gap-4 rounded-xl border-2 border-dashed px-6 py-10 transition-colors cursor-pointer group ${
            isDragging
              ? "border-[#137fec] bg-[#137fec]/5"
              : "border-gray-300  hover:border-[#137fec]  bg-gray-50"
          }`}
        >
          {preview ? (
            <div className="size-20 rounded-xl overflow-hidden border-2 border-[#137fec]/30">
              <img
                src={preview || "/placeholder.svg"}
                alt="Logo preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="size-12 rounded-full bg-white  flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#137fec] transition-colors">
              <ImagePlus className="size-7" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <p className="text-gray-900  text-base font-bold leading-tight tracking-[-0.015em] text-center">
              {preview ? "Change workspace logo" : "Upload workspace logo"}
            </p>
            <p className="text-gray-500  text-sm font-normal leading-normal max-w-[320px] text-center">
              Drag and drop or click to browse. <br />
              Recommended size: 256x256px.
            </p>
          </div>
          <button
            type="button"
            className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-white  border border-gray-200  text-gray-900  text-sm font-bold leading-normal hover:bg-gray-50  transition-colors"
          >
            <span>Browse Files</span>
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
