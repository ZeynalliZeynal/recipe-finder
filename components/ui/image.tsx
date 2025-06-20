import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImageProps {
  variant?: "default" | "fullWidth" | "halfWidth" | "thumbnail";
}

export function OptimizedImage({
  variant = "default",
  className,
  alt,
  ...props
}: OptimizedImageProps) {
  let sizes;
  switch (variant) {
    case "fullWidth":
      sizes = "100vw";
      break;
    case "halfWidth":
      sizes = "(max-width: 768px) 100vw, 50vw";
      break;
    case "thumbnail":
      sizes = "(max-width: 768px) 100px, 200px";
      break;
    default:
      sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
  }

  return (
    <Image
      className={cn("w-full object-cover z-0", className)}
      fill
      alt={alt}
      sizes={sizes}
      {...props}
    />
  );
}
