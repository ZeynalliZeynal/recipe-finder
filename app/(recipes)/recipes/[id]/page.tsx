import { getRecipe, getRecipeIds } from '@/actions/recipes.action'
import { ChefHat, Clock, Users } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/image'
import RecipeSidebar from '@/app/(recipes)/recipes/[id]/_sections/recipe-sidebar'
import RecipeInfoCard from '@/app/(recipes)/recipes/[id]/_components/recipe-info-card'

export async function generateStaticParams() {
  const recipeIds = await getRecipeIds()

  return recipeIds.map((id) => ({ id: id.toString() }))
}

export default async function RecipePage({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params

  const recipe = await getRecipe(+id)

  return (
    <section>
      <div className="max-w-3xl px-6 mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold max-md:text-2xl">
              {recipe.title}
            </h1>
            <div className="flex items-center gap-3 text-neutral-600 max-md:text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{recipe.readyInMinutes} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                <span>Main Course</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_240px] gap-4 max-sm:grid-cols-1">
            <div className="flex flex-col gap-4">
              <div className="h-72 relative">
                <OptimizedImage
                  className="rounded-xl border"
                  src={recipe.image}
                  alt={recipe.title}
                />
              </div>
              <RecipeInfoCard
                title="Instructions"
                markup={recipe.instructions}
              />
              <RecipeInfoCard title="Summary" markup={recipe.summary} />
            </div>
            <RecipeSidebar recipe={recipe} />
          </div>
        </div>
      </div>
    </section>
  )
}
