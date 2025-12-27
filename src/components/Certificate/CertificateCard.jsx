// components/Certificate/CertificateCard.jsx
import { ExternalLink } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Tooltip from './Tooltip';

export default function CertificateCard({ caption, certificateUrl, certificateImage, shadowColor }) {
  return (
    <div className="group relative flex flex-col items-center">
      <a
        href={certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-700/50 hover:border-gray-600 transition-all duration-300"
        style={{
          transform: 'translateY(0)',
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translate(10px, -10px) scale(1.02)';
          e.currentTarget.style.boxShadow = `-15px 15px 30px ${shadowColor}60, -8px 8px 15px ${shadowColor}40`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0, 0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }}
      >
        <LazyLoadImage
          src={certificateImage}
          alt={`${caption} certificate`}
          effect="blur"
          className="w-full h-full object-contain bg-gray-900"
          wrapperClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Tooltip text="View Certificate">
            <ExternalLink className="w-8 h-8 text-white" />
          </Tooltip>
        </div>
      </a>
      <div className="mt-3 text-center w-full px-2">
        <p className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-wider">{caption}</p>
      </div>
    </div>
  );
}
