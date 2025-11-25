import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface CompactProps {
  id?: string | number;
  title?: string;
  location?: string;
  price?: any;
  askingPrice?: any;
  soldPrice?: any;
  status?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}

function formatPriceValue(val: any) {
  if (val === null || val === undefined || val === "") return "Price on request";
  if (typeof val === "number" && !Number.isNaN(val)) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  }
  if (typeof val === "string") {
    const cleaned = String(val).replace(/[^0-9.\-]/g, "");
    const num = Number(cleaned);
    if (!Number.isNaN(num)) return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
    return val;
  }
  return String(val);
}

const CompactPropertyCard = ({ id, title = "Untitled", location = "", price, askingPrice, soldPrice, status, image, images = [], photos = [], onClick, ...rest }: CompactProps) => {
  const displayPrice = formatPriceValue(askingPrice ?? price ?? soldPrice);
  const isPrevious = rest.previous === true || status === "sold";

  // Robust id detection: some records may use different keys for the document id
  const idCandidate =
    id ?? rest.id ?? (rest._id as any) ?? (rest.docId as any) ?? (rest.uid as any) ?? (rest.slug as any) ?? null;

  const link = idCandidate ? (isPrevious ? `/listings/closed/${idCandidate}` : `/listings/${idCandidate}`) : "/listings";

  // Build a map of local asset filenames -> final URLs (Vite will replace these at build time).
  // This lets listing records that store just 'property-1.jpg' resolve to the actual bundled asset.
  let localAssetMap: Record<string, string> = {};
  try {
    const modules = import.meta.glob('/src/assets/*.{jpg,jpeg,png,svg}', { eager: true, as: 'url' }) as Record<string, string>;
    localAssetMap = Object.fromEntries(
      Object.keys(modules).map((p) => [p.split('/').pop() as string, modules[p]])
    );
  } catch (e) {
    // import.meta.glob may not be available in some contexts; silently ignore.
  }

  // determine thumbnail candidate
  let thumbCandidate =
    (typeof image === "string" && image) ||
    (Array.isArray(images) && images.length && images[0]) ||
    (Array.isArray(photos) && photos.length && photos[0]) ||
    "/placeholder.svg";

  // If the candidate looks like a bare filename, try to map it to local asset URL
  const isBareFilename = typeof thumbCandidate === 'string' && /^[^:\/]+\.(jpg|jpeg|png|svg)$/i.test(thumbCandidate);
  const thumb = isBareFilename && localAssetMap[thumbCandidate.split('/').pop() as string]
    ? localAssetMap[thumbCandidate.split('/').pop() as string]
    : thumbCandidate;

  const cardContent = (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow border-border/50">
      <div className="w-full aspect-video bg-muted overflow-hidden">
        <img
          src={thumb}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e: any) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">{title}</h3>
            {location && <div className="text-sm text-muted-foreground truncate">{location}</div>}
          </div>

          <div className="text-right ml-2">
            <div className="text-lg font-bold text-foreground">{displayPrice}</div>
          </div>
        </div>
      </div>
    </Card>
  );

  // If onClick handler is provided, use div with onClick (for modals)
  if (onClick) {
    return (
      <div onClick={onClick} className="block cursor-pointer">
        {cardContent}
      </div>
    );
  }

  // Default: use Link component for navigation
  return (
    <Link to={link} className="block">
      {cardContent}
    </Link>
  );
};

export default CompactPropertyCard;
