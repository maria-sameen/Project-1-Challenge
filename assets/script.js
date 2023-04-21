
// Main function block, prevent default to start things off, followed by the API call.
$(document).ready(function () {
    $("#searchButton").on("click", function (event){
        event.preventDefault();


    const ingredient = $("#ingredientInput").val().trim();
    // Validation added here to ensure something has been entered.
    if (!ingredient) return;

    const apiKey = "ef97436974msha2f90f1e83d332fp1e6007jsnc60c6c3cc314"
    const apiUrl = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${encodeURIComponent(ingredient)}`;

    const settings = {
        async: true,
        crossDomain: true,
        url: apiUrl,
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
        },
      };

      $.ajax(settings).done(function (response) {
        displayResults(response);
      });
    });

// Needs remaining code here to return results to the display

    function displayResults(response) {
        if (!response || response.length === 0) {
            $("#result").html("<h4>Sorry! No valid recipe found, check your input.</h4>");
            return;
        }

        const {
            title,
            ingredients,
            servings,
            instructions,
          } = response[0];
    
          const result = `
          <h2>${title}</h2>
          <h4>Servings: ${servings}</h4>
          <h4>Ingredients</h4>
          <ul>${ingredients}</ul>
          <h4>Instructions</h4>
          <p>${instructions}</p>
        `;
      
        $("#result").html(result);
      }
    });