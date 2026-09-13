"use client";

import { useRef, useState } from "react";

interface ExistingImage {
  id: string;
  url: string;
}

interface PendingFile {
  file: File;
  previewUrl: string;
}

interface ImageUploaderProps {
  existingImages: ExistingImage[];
}

/**
 * Multi-file image picker used inside ProductForm. New files are kept in
 * sync with a real hidden <input type="file" name="images" multiple> via
 * DataTransfer so they submit with the surrounding <form>; images already
 * saved to Supabase are marked for removal via hidden
 * `remove_image_ids` inputs rather than deleted immediately -- the actual
 * delete (DB row + Storage object) happens server-side on save.
 */
export default function ImageUploader({ existingImages }: ImageUploaderProps) {
  const [images, setImages] = useState(existingImages);
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<PendingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function syncFileInput(files: File[]) {
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    if (fileInputRef.current) {
      fileInputRef.current.files = dt.files;
    }
  }

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    const combined = [...newFiles, ...selected];
    setNewFiles(combined);
    syncFileInput(combined.map((f) => f.file));
  }

  function removeExisting(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setRemovedIds((prev) => [...prev, id]);
  }

  function removeNew(index: number) {
    const target = newFiles[index];
    if (target) URL.revokeObjectURL(target.previewUrl);
    const updated = newFiles.filter((_, i) => i !== index);
    setNewFiles(updated);
    syncFileInput(updated.map((f) => f.file));
  }

  return (
    <div>
      <div className="image-uploader">
        {images.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="image-thumb" key={img.id}>
            <img src={img.url} alt="" />
            <button type="button" className="remove-btn" onClick={() => removeExisting(img.id)} aria-label="სურათის წაშლა">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>
        ))}

        {newFiles.map((pending, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="image-thumb" key={`new-${i}`}>
            <img src={pending.previewUrl} alt="" />
            <button type="button" className="remove-btn" onClick={() => removeNew(i)} aria-label="სურათის წაშლა">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>
        ))}

        <label className="image-upload-add">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          სურათის დამატება
          <input ref={fileInputRef} type="file" name="images" accept="image/*" multiple hidden onChange={handleFilesSelected} />
        </label>
      </div>

      {removedIds.map((id) => (
        <input key={id} type="hidden" name="remove_image_ids" value={id} />
      ))}
    </div>
  );
}
