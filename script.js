"use strict";


function userInput() {
  let wordInput = $("#listen-user-input").val();
  return wordInput;
}

$(document).ready(function() {
  console.log("Ready to Search GitHub Users!");
  watchSubmitButton();
});


function watchSubmitButton() {
  $("#search-form").submit(e => {
    console.log("it works!");
    e.preventDefault();
    fetchUserAPI(userInput);
  });
}

//Make Request to GitHub API
function fetchUserAPI() {
  fetch("https://api.github.com/users/" + userInput() + "/repos")
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Sorry, Cannot find user by that"));
}

// Function to render User Repos to DOM
function displayResults(responseJson) {
  console.log(responseJson);
  $("#display-profile").empty();
  let responseHtml = "";
  responseJson.forEach(userRepo => {
    responseHtml += `<div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">${userRepo.name}</h3>
    </div>
    <div class="panel-body">
     <div class= "row>
     <div class="col-md-3">
     <a href=" ${userRepo.html_url}">Repo URL Link</a>
     </div>
    </div> 
  </div>`;
  });
  $("#display-profile").html(responseHtml);
  $(".display-results-container").removeClass("hidden");
}
