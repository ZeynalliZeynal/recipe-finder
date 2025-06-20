'use server'

import { api_key } from '@/utils/env.util'
import axios, { AxiosError } from 'axios'
import { notFound } from 'next/navigation'

export async function getRecipes({
  query,
  cuisine,
  maxReadyTime,
}: RecipeQuery): Promise<RecipeResponse> {
  const url = new URL('https://api.spoonacular.com/recipes/complexSearch')
  url.searchParams.set('apiKey', api_key)

  if (query) url.searchParams.set('query', query)
  if (cuisine) url.searchParams.set('cuisine', cuisine)
  if (maxReadyTime) url.searchParams.set('maxReadyTime', String(maxReadyTime))

  try {
    const response = await fetch(url.toString(), {
      next: {
        revalidate: 60,
      },
    })
    return response.json()
  } catch (error) {
    throw error
  }
}

export async function getRecipe(id: number): Promise<RecipeDetails> {
  try {
    const response = await axios(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}`,
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError
    if (err.status === 404) notFound()
    throw error
  }
}

export async function getRecipeIds(): Promise<number[]> {
  try {
    const response = await axios(
      'https://api.spoonacular.com/recipes/complexSearch',
    )

    return response.data.results.map((recipe: Recipe) => recipe.id)
  } catch (error) {
    throw error
  }
}
