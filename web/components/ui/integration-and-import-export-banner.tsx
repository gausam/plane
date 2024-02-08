import { AlertCircle } from "lucide-react";

type Props = {
  bannerName: string;
  description?: string;
};

export const IntegrationAndImportExportBanner: React.FC<Props> = ({ bannerName, description }) => (
  <div className="flex items-start gap-3 border-b border-neutral-border-subtle py-3.5">
    <h3 className="text-xl font-medium">{bannerName}</h3>
    {description && (
      <div className="flex items-center gap-3 rounded-[10px] border border-custom-primary/75 bg-custom-primary/5 p-4 text-sm text-neutral-text-strong">
        <AlertCircle className="h-6 w-6 text-neutral-text-strong" />
        <p className="leading-5">{description}</p>
      </div>
    )}
  </div>
);
