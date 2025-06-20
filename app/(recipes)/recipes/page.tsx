import RecipesSection from "@/app/(recipes)/recipes/_sections/recipes-section";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<RecipeQuery>;
}) {
  const params = await searchParams;

  return (
    <>
      <Suspense fallback="Loading recipes...">
        <RecipesSection searchParams={params} />
      </Suspense>
    </>
  );
}
