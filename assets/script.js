
// Main function block, prevent default to start things off, followed by the API call.
$(document).ready(function () {
    $("#searchButton").on("click", function (event) {
      event.preventDefault();
  
      const ingredient = $("#ingredientInput").val().trim();
      //Validation to ensure something has been entered.
      if (!ingredient) return;
  
      //New functions for each API Call
      recipeSearch(ingredient);
      gifSearch(ingredient);
    });
  
    function recipeSearch(ingredient) {
      const apiKey = "ef97436974msha2f90f1e83d332fp1e6007jsnc60c6c3cc314";
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
    }
  
    function gifSearch(ingredient) {
      const apiKey = "nMb9knF7L832gcVaisVbvgZjUVLdDsif";
      const apiUrl = `https://giphy.p.rapidapi.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(ingredient)}&limit=1&offset=0&rating=g&lang=en`;
  
      const settings = {
        async: true,
        crossDomain: true,
        url: apiUrl,
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "ef97436974msha2f90f1e83d332fp1e6007jsnc60c6c3cc314",
          "X-RapidAPI-Host": "giphy.p.rapidapi.com",
        },
      };
  
      $.ajax(settings).done(function (response) {
        displayGifs(response);
      });
    }

// Needs remaining code here to return results to the display
    //First the Recipe data
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
          <ul>${ingredients.replace(/\|/g, '<br></br>')}</ul>
          <h4>Instructions</h4>
          <p>${instructions}</p>
        `;
      
        $("#result").html(result);
      }

      //Second the GIF data
      function displayGifs(response) {
        if (!response || !response.data === 0) {
          $("#gif").html("<h4>Sorry! No GIFs found, check your input.</h4>");
          return;
        }
    
        const gifUrl = response.data[0].images.original.url;
        
        //Returns a header with the search term entered
        const gifEmbed = `
          <h4>GIF related to ${$("#ingredientInput").val()}:</h4>
          <img src="${gifUrl}" alt="GIF related to ${$("#ingredientInput").val()}" class="img-fluid"/>
        `;
    
        $("#gif").html(gifEmbed);
      }

    });