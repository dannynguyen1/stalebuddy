function RecipeModel() {
  return {
    "name" : null,
    "ingredients" : null,
    "url" : null,
    "image" : null,
    "ts" : null,
    "datePublished" : null,
    "source" : null,
    "recipeYield" : null,
    "prepTime" : null,
    "description" : null
  };
}

module.exports = {
  name: "cookbookRecipes",
  constructor: RecipeModel
}