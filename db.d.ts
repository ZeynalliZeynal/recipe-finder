declare global {
  interface RecipeQuery {
    query: string;
    cuisine: string;
    maxReadyTime: number;
  }

  interface Recipe {
    id: number;
    title: string;
    image: string;
  }

  interface RecipeResponse {
    totalResults: number;
    results: Recipe[];
  }

  interface RecipeDetails {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    summary: string;
    extendedIngredients: Array<{
      id: number;
      original: string;
      amount: number;
      unit: string;
      name: string;
    }>;
    analyzedInstructions: Array<{
      steps: Array<{
        number: number;
        step: string;
      }>;
    }>;
    dishTypes: string[];
    instructions: string;
    diets: string[];
  }
}

export {};
