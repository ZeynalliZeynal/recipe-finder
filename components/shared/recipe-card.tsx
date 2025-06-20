import { OptimizedImage } from "@/components/ui/image";
import Link from "next/link";
import { mainRoutes } from "@/constants/routes";

export default function RecipeCard({ data }: { data: Recipe }) {
  return (
    <div className="p-3 rounded-xl relative hover:bg-neutral-50 border flex flex-col gap-3">
      <div className="relative h-48">
        <OptimizedImage
          src={data.image}
          alt={data.title}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm line-clamp-2">{data.title}</h2>
      </div>
      <Link
        href={mainRoutes.recipe(data.id)}
        className="absolute inset-0"
        aria-label={`Go to recipe ${data.title}`}
      />
    </div>
  );
}
