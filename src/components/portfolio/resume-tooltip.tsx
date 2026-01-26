import { Tooltip } from "@/components/ui/tooltip-card";
import { FileDownloadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface ResumeTooltipProps {
  url: string;
  previewUrl?: string;
}

export function ResumeTooltip({ url, previewUrl }: ResumeTooltipProps) {
  const content = (
    <div className="flex flex-col gap-2 w-64">
      <img
        alt="Resume"
        className="h-40 w-full bg-muted/20 object-cover rounded-md"
        src={previewUrl || "/social-preview/resume_preview.jpg"}
      />
      <div>
        <p className="font-semibold text-foreground">Resume</p>
        <p className="text-xs text-muted-foreground line-clamp-2">
          View/Download Resume
        </p>
      </div>
    </div>
  );

  return (
    <Tooltip content={content} containerClassName="block">
      <a
        aria-label="Resume"
        className="block cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <HugeiconsIcon icon={FileDownloadIcon} size={15} />
      </a>
    </Tooltip>
  );
}
