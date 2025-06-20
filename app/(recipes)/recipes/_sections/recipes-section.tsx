import RecipeCard from '@/components/shared/recipe-card'
import { getRecipes } from '@/actions/recipes.action'

export default async function RecipesSection({
  searchParams,
}: {
  searchParams: RecipeQuery
}) {
  const recipes = await getRecipes(searchParams)

  return (
    <section>
      <div className="container">
        <h1 className="text-3xl font-medium mb-6 max-md:text-2xl max-md:text-center">
          Recipes found: {recipes.results.length}
        </h1>
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {recipes.totalResults > 0
            ? recipes.results.map((recipe) => (
                <RecipeCard key={recipe.id} data={recipe} />
              ))
            : 'No recipe found.'}
        </div>
      </div>
    </section>
  )
}
