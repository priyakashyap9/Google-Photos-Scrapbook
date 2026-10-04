import React, { useState } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

/**
 * Reusable image component with loading indicator and fallback handling
 */
export function ImageWithFallback({
  src,
  alt = 'Photo',
  className = '',
  aspectRatio = '1/1',
  onClick,
  ...props
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    console.warn(`[ImageWithFallback] Failed to load image: ${src}`);
  };

  return (
    <div
      className={`image-fallback-container ${className}`}
      style={{ aspectRatio }}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="image-skeleton-overlay">
          <Loader2 className="animate-spin text-gray-400" size={24} />
        </div>
      )}

      {error ? (
        <div className="image-error-fallback">
          <ImageOff size={28} className="text-gray-400 mb-1" />
          <span className="image-error-text">Photo unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`image-fallback-img ${loading ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
        />
      )}
    </div>
  );
}
