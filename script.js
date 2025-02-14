document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        fetchRecipes(query);
    }
});

function fetchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.meals);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

function displayRecipes(meals) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!meals) {
        resultsDiv.innerHTML = '<p>No recipes found. Try a different search.</p>';
        return;
    }

    meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';

        const title = document.createElement('h3');
        title.textContent = meal.strMeal;

        const image = document.createElement('img');
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;

        const link = document.createElement('a');
        link.href = meal.strYoutube;
        link.textContent = 'Watch Video';
        link.target = '_blank';

        recipeDiv.appendChild(image);
        recipeDiv.appendChild(title);
        recipeDiv.appendChild(link);

        resultsDiv.appendChild(recipeDiv);
    });
}