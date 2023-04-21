
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