var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        console.log(response);
        // format the response to json
        response.json().then(function(data) {
            console.log(data);
        })
    })
};

getUserRepos("lernantino"); 
  



// collect user input to form HTTP requests
// use an HTTP request's reponse to display data to the user
// Handle errors that may occur when working with server-side APIs