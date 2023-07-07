import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import RecipeCard from "./RecipeCard";
import Modal from "./Modal";

export default function RecipesList() {
  const { recipes, selectedIngredient, selectedRecipe, fetchRecipeById } =
    useContext(AppContext);
  const [show, setShow] = useState(false);

  return (
    <div className="w-4/5 px-4 border-l overflow-scroll">
      <Modal setShow={setShow} show={show}>
        <div className="border-4 border-dashed p-2">
          <div>
            <h1 className="text-lg font-bold text-gray-600">
              {selectedRecipe && selectedRecipe!.strMeal}
            </h1>
            <p className="text-sm text-gray-500">
              {selectedRecipe && selectedRecipe!.strCategory}
            </p>
          </div>
          {selectedRecipe &&
            selectedRecipe.ingredients.map((ingredient) => (
              <div
                className="flex items-center space-x-4"
                key={ingredient.strIngredient}
              >
                <div className="col-span-1">
                  <img
                    className="w-8 rounded"
                    src={ingredient.thumbnail}
                    alt={ingredient.thumbnail}
                  ></img>
                </div>
                <div className="col-span-5">{ingredient.strIngredient}</div>
                <div className="col-span-5 text-right flex-1">
                  {ingredient.measure}
                </div>
              </div>
            ))}
        </div>
        <div className="flex-1 border-4 border-dashed p-2">
          {selectedRecipe && (
            <textarea className="w-full h-full">
              {selectedRecipe.strInstructions}
            </textarea>
          )}
        </div>
      </Modal>
      <div className="justify-between mb-2 -ml-4 fixed bg-white px-4 border p-2 rounded-r-xl shadow-xl">
        <h2 className="text-gray-700 font-bold text-lg">
          Recipes with {selectedIngredient?.strIngredient}
        </h2>
        <div className="text-gray-500 text-sm">
          Total Number of Recipes {recipes?.length}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8 mt-20">
        {recipes?.map((recipe) => (
          <RecipeCard
            onViewRecipe={(recipe) => {
              fetchRecipeById(recipe.idMeal);
              setShow(true);
            }}
            key={recipe.idMeal}
            recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
}