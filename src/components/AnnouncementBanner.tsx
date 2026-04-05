import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  text: string;
}

export function AnnouncementBanner({ text }: Props) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="announcement-banner" role="alert">
      <span className="announcement-banner__text">{text}</span>
      <button
        className="announcement-banner__close"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
      >
        <X size={15} />
      </button>
    </div>
  );
}
