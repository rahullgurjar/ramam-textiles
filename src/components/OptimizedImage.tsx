import React, { useState } from 'react';
import { resolveProductImage, resolveWebpImage } from '../utils/imageUtils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  fallbackSrc = './products/duffle-kantha-patchwork.jpg',
  onError,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  const activeSrc = hasError ? fallbackSrc : src;
  const webpUrl = resolveWebpImage(activeSrc);
  const jpgUrl = resolveProductImage(activeSrc);

  const isLocalImage = !activeSrc.startsWith('http://') && !activeSrc.startsWith('https://') && !activeSrc.startsWith('data:');

  return (
    <picture className="contents">
      {isLocalImage && <source srcSet={webpUrl} type="image/webp" />}
      <img
        src={jpgUrl}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // @ts-ignore fetchPriority is standard in modern HTML
        fetchPriority={priority ? 'high' : 'auto'}
        onError={(e) => {
          if (!hasError) {
            setHasError(true);
          }
          if (onError) {
            onError(e);
          }
        }}
        {...rest}
      />
    </picture>
  );
};
