import { ReactNode } from "react";

interface FeatureItemProps {
  label: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

/**
 * FeatureItem component for displaying interactive feature cards
 * 
 * @param label - The main label/title of the feature
 * @param description - Detailed description of the feature
 * @param icon - Icon component to display
 * @param onClick - Click handler function
 */
export default function FeatureItem({ label, description, icon, onClick }: FeatureItemProps) {
  return (
    <button 
      onClick={onClick}
      className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 backdrop-blur-sm text-left transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-sm active:scale-95"
      aria-label={`${label} - ${description}`}
    >
      <div className="mb-3">
        {icon}
      </div>
      <span className="font-medium block">{label}</span>
      <span className="text-xs text-slate-400 mt-1 block">{description}</span>
    </button>
  );
}
