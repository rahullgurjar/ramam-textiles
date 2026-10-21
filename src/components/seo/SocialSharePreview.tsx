import React, { useState } from 'react';
import { Share2, ExternalLink, Image as ImageIcon } from 'lucide-react';

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterXIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface SocialSharePreviewProps {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  twitterCard: 'summary_large_image' | 'summary';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export const SocialSharePreview: React.FC<SocialSharePreviewProps> = ({
  ogTitle,
  ogDescription,
  ogImage,
  canonicalUrl,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage
}) => {
  const [platform, setPlatform] = useState<'facebook' | 'twitter'>('facebook');

  const title = platform === 'facebook' ? (ogTitle || 'Ramam Textiles Jaipur') : (twitterTitle || ogTitle || 'Ramam Textiles Jaipur');
  const desc = platform === 'facebook' ? (ogDescription || 'Authentic Jaipur hand block printed textiles.') : (twitterDescription || ogDescription || 'Authentic Jaipur hand block printed textiles.');
  const image = platform === 'facebook' ? (ogImage || '/logo.png') : (twitterImage || ogImage || '/logo.png');
  const urlDomain = (canonicalUrl || 'https://ramamtextiles.shop').replace(/^https?:\/\//, '').split('/')[0].toUpperCase();

  const fullImg = image.startsWith('http') ? image : `https://ramamtextiles.shop${image.startsWith('/') ? image : '/' + image}`;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-[#9B332C]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Live Social Media Sharing Card Preview
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setPlatform('facebook')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              platform === 'facebook' ? 'bg-white text-blue-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <FacebookIcon className="w-3.5 h-3.5" />
            <span>Open Graph</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatform('twitter')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              platform === 'twitter' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <TwitterXIcon className="w-3.5 h-3.5" />
            <span>Twitter / X</span>
          </button>
        </div>
      </div>

      {platform === 'facebook' ? (
        /* Open Graph Preview (Facebook / LinkedIn / Slack) */
        <div className="max-w-md mx-auto border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow transition-shadow">
          <div className="w-full h-48 bg-stone-100 relative overflow-hidden flex items-center justify-center">
            {image ? (
              <img 
                src={fullImg} 
                alt="Social Preview" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                }}
              />
            ) : (
              <div className="text-stone-400 flex flex-col items-center gap-1">
                <ImageIcon className="w-8 h-8" />
                <span className="text-xs">No Social Image Assigned</span>
              </div>
            )}
          </div>
          <div className="p-3 bg-[#f2f3f5] border-t border-stone-200">
            <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wide block truncate">
              {urlDomain}
            </span>
            <h4 className="text-sm font-bold text-[#1d2129] line-clamp-2 mt-0.5 leading-snug">
              {title}
            </h4>
            <p className="text-xs text-[#606770] line-clamp-2 mt-1 leading-relaxed">
              {desc}
            </p>
          </div>
        </div>
      ) : (
        /* Twitter / X Card Preview */
        <div className={`max-w-md mx-auto border border-stone-200 rounded-2xl overflow-hidden bg-black text-white shadow-sm ${
          twitterCard === 'summary' ? 'flex items-center p-3 gap-3' : ''
        }`}>
          {twitterCard === 'summary_large_image' ? (
            <>
              <div className="w-full h-48 bg-stone-900 relative overflow-hidden flex items-center justify-center">
                <img 
                  src={fullImg} 
                  alt="Twitter Card" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logo.png';
                  }}
                />
              </div>
              <div className="p-3.5 bg-[#000000] border-t border-stone-800">
                <span className="text-[11px] text-stone-400 block truncate">
                  {urlDomain}
                </span>
                <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">
                  {title}
                </h4>
                <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                  {desc}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-stone-900 rounded-xl overflow-hidden shrink-0">
                <img 
                  src={fullImg} 
                  alt="Twitter Card" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-stone-400 block truncate">
                  {urlDomain}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                  {title}
                </h4>
                <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5">
                  {desc}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <div className="text-[11px] text-stone-500 text-center">
        Recommended social image dimensions: <strong>1200 × 630 pixels</strong> (1.91:1 ratio) for crystal clear display on mobile & desktop social timelines.
      </div>
    </div>
  );
};
