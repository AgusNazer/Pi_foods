import style from './Detail.module.css'
import * as actions from '../../Redux/actions.js'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
// import loadingGif from '../../assets/loader.gif';

const Detail = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const details = useSelector(state => state.details);

  useEffect(() => {
    setLoading(true);
    setRecipe({});
    dispatch(actions.getRecipesDetails(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [id, dispatch]);

  useEffect(() => {
    setRecipe(details);
  }, [details]);

  function stripHtmlTags(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }

  return (
  <div className={style.imgCreatedRecipe}>
    <div className={style.detailContainer}>
      {loading ? (
        <div>
          <h1 className={style.loadingText}>Loading...</h1>
          </div>
       
      
    //   <img className={''} src={loadingGif} alt="Loading..." />
    
      ) : (
        <>
          <div className={style.leftSection}>
            <div className={style.recipeDetails}>
              {recipe.id && <h4 className={style.recipeDetail}>ID: {recipe.id}</h4>}
              {recipe.name && <h2 className={style.recipeTitle}>{recipe.name}</h2>}
              {recipe.healthScore && <h4 className={style.recipeDetail}>Health Score: {recipe.healthScore}</h4>}
            <div className={style.containerSummary}> 
              {recipe.summary && (
                <div className={style.recipesummary}>
                  <h4 className={style.summaryTitle}>Summary:</h4>
                  {/* stripHtmlTags devuelve el parrafo sin etiquetas html */}
                  <p className={style.summaryText}>{stripHtmlTags(recipe.summary)}</p>
                </div>
              )}
            </div>
            <div className={style.containerInstructions}>
              {recipe.analyzedInstructions && (
                <div className={style.recipeInstructions}>
                  <h4 className={style.instructionsTitle}>Instructions:</h4>
                  <p className={style.instructionsText}>{recipe.analyzedInstructions}</p>
                </div>
              )}
            </div>
            <div className={style.containerDiets}> 
              {recipe.diets && (
                <div className={style.recipeDiets}>
                  <h4 className={style.dietsTitle}>Diet type:</h4>
                  <ul className={style.dietsList}>
                    {recipe.diets.map((diet, index) => (
                      <li key={index} className={style.dietItem}>{diet}</li>
                    ))}
                      
                  </ul>
                </div>
              )}
            </div>    
            </div>
          </div>
          <div className={style.rightSection}>
            <div className={style.imageContainer}>
              {recipe.image && <img className={style.recipeImage} src={recipe.image} alt="recipe" />}
            </div>
            <NavLink to={'/home'}>
              <button className={style.homeButton}>Back to Home</button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  </div>    
  );
};

export default Detail;