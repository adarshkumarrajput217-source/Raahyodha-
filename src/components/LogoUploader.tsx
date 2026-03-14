import React, { useState, useRef } from 'react';
import { Upload, Loader2, CheckCircle, AlertCircle, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

export const LogoUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadLogo(file, null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadLogo(e.dataTransfer.files[0], null);
    }
  };

  const handleUrlSubmit = async () => {
    if (!imageUrl.trim()) {
      setStatus('error');
      setMessage('Please enter a valid image URL');
      return;
    }
    await uploadLogo(null, imageUrl);
  };

  const uploadLogo = async (file: File | null, url: string | null) => {
    setIsUploading(true);
    setStatus('idle');
    setMessage('');

    const formData = new FormData();
    if (file) {
      formData.append('logo', file);
    } else if (url) {
      formData.append('imageUrl', url);
    }

    try {
      const response = await fetch('/api/upload-logo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Logo uploaded successfully! Please refresh the page to see changes.');
        setImageUrl('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to upload logo');
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An error occurred during upload');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm mt-4">
      <h3 className="font-bold text-slate-800 mb-2 text-lg">Upload Custom Logo</h3>
      <p className="text-sm text-slate-500 mb-6">
        Upload a file or paste an image link. The system will automatically remove white backgrounds and generate all required icon sizes.
      </p>
      
      <div className="flex flex-col gap-6">
        {/* Drag & Drop File Upload Section */}
        <div 
          className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${dragActive ? 'border-primary bg-primary/5' : 'border-slate-300 hover:bg-slate-50'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.svg,.webp"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          {isUploading && !imageUrl ? (
            <div className="flex flex-col items-center">
              <Loader2 size={32} className="animate-spin text-primary mb-3" />
              <p className="text-sm font-medium text-slate-700">Processing file...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                <Upload size={24} className="text-slate-500" />
              </div>
              <p className="text-sm font-bold text-slate-700 mb-1">Click to upload file or drag and drop</p>
              <p className="text-xs text-slate-500">PNG, JPG, SVG, WEBP (max. 10MB)</p>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">OR</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* URL Upload Option */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Paste Image Link</label>
          <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon size={16} className="text-slate-400" />
              </div>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                disabled={isUploading}
              />
            </div>
            <button
              onClick={handleUrlSubmit}
              disabled={isUploading || !imageUrl.trim()}
              className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 disabled:opacity-50 transition-colors text-sm whitespace-nowrap flex items-center gap-2"
            >
              {isUploading && imageUrl ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
              Upload Link
            </button>
          </div>
        </div>

        {status === 'success' && (
          <div className="flex items-center gap-2 text-green-700 text-sm bg-green-50 border border-green-200 p-4 rounded-xl w-full">
            <CheckCircle size={18} className="shrink-0" />
            <span className="font-medium">{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-700 text-sm bg-red-50 border border-red-200 p-4 rounded-xl w-full">
            <AlertCircle size={18} className="shrink-0" />
            <span className="font-medium">{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
