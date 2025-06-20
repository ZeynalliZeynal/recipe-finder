import { getRecipe } from "@/actions/recipes.action";
import { ChefHat, Clock, Users } from "lucide-react";
import { OptimizedImage } from "@/components/ui/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const recipe = await getRecipe(id);
  console.log(recipe);

  return (
    <section>
      <div className="max-w-3xl p-6 mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold">{recipe.title}</h1>
            <div className="flex items-center gap-3 text-neutral-600">
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
          <div className="grid grid-cols-[1fr_240px] gap-4">
            <div className="flex flex-col gap-4">
              <div className="h-72 relative">
                <OptimizedImage
                  className="rounded-xl border"
                  src={recipe.image}
                  alt={recipe.title}
                />
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2>Instructions</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{recipe.instructions}</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2>Summary</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    dangerouslySetInnerHTML={{
                      __html: recipe.summary,
                    }}
                  />
                </CardContent>
              </Card>
            </div>
            <aside className="flex flex-col gap-4">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>
                    <h2>Ingredients</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-3">
                    {recipe.extendedIngredients.map((ingredient) => (
                      <li className="grid grid-cols-[2rem_1fr] gap-2">
                        <span>{ingredient.amount}</span>
                        {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
