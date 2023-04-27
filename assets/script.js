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

     // Function to update the history list with the name of the searched ingredient.
     let historyItems = [];

     function updateHistoryList(ingredient) {
      if (historyItems.includes(ingredient)) {
        // if the Ingredient already exists in history, skip adding it again.
        return;
      }
      // Add ingredient to history and store in array
      const historyList = $("#history");
      const button = $("<button>", {
        class: "list-group-item ingredient-history",
        text: ingredient,
        "data-ingredient": ingredient,
        click: function(event) {
          event.preventDefault();
          const ingredient = $(this).data("ingredient");
          $("#ingredientInput").val(ingredient);
          recipeSearch(ingredient);
          gifSearch(ingredient);
        }
      });
      historyList.append(button);
      historyItems.push(ingredient);
    }
  
    function recipeSearch(ingredient) {
      // CHANGE API KEY HERE (RECIPE NINJAS)
      const apiKey = "177cccf4c3msh0222949971f784ap1a03fcjsnd8b2ad800fcb";
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
        updateHistoryList(ingredient);
      });
    }
  
    function gifSearch(ingredient) {
      //CHANGE API KEY HERE (GIPHY)
      const apiKey = "pFPrxiWdwAtZ7DKu0oUsH3XyFIa7kt5l";
      // You can adjust the limit here for the results, and the maturity - it is set to return 10 results but one is picked by the function below, the rating is set to G which I hope means Universal (i.e. family friendly).
      const apiUrl = `https://giphy.p.rapidapi.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(ingredient)}&limit=10&offset=0&rating=g&lang=en`;
  
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
    
      // Returns a random Recipe from the results.
      const recipeIndex = Math.floor(Math.random() * response.length);
      const {
        title,
        ingredients,
        servings,
        instructions,
      } = response[recipeIndex];
    
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
        
        // Returns a random GIF from the results
        const gifIndex = Math.floor(Math.random() * response.data.length);
        const gifUrl = response.data[gifIndex].images.original.url;
        
        //Returns a header with the search term entered
        const gifEmbed = `
          <h4>GIF related to ${$("#ingredientInput").val()}:</h4>
          <img src="${gifUrl}" alt="GIF related to ${$("#ingredientInput").val()}" class="img-fluid"/>
        `;
    
        $("#gif").html(gifEmbed);
      }

    });
