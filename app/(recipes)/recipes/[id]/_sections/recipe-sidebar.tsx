import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RecipeSidebar({ recipe }: { recipe: RecipeDetails }) {
  return (
    <aside className="flex flex-col gap-4">
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle>
            <h2>Ingredients</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {recipe.extendedIngredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-2"
              >
                {ingredient.name}
                <span>{ingredient.amount}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  )
}
