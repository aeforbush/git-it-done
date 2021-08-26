// variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// this function passes the argument through the getUserRepo function
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
            // clear old content
        repoContainerEl.textContent = "";
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    //console.log(event);
};

    // defining (user) is just an arbitrary name for the argument being passed through
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url (call back code)
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            //console.log(response);
            response.json().then(function(data){
                //console.log(data);
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
        })
        .catch(function(error) {
            // notice this '.catch()' getting chained onto the end of the '.then()'
            alert("Unable to connect to GitHub");
        });
};


var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
        
    }
    repoSearchTerm.textContent = searchTerm;
    
    // dynanically creating HTML elements from the api response (loop over repos)
    for (var i = 0; i< repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold the formatted repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);
    
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
            
        // check if current repo has issues or not
        if (repos[i].open_issues_count >0) {
        statusEl.innerHTML = 
        "<i class='fas fa-times status-icon icon-dnager'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    
    }

    //console.log(repos);
    //console.log(searchTerm);
};

userFormEl.addEventListener("submit", formSubmitHandler);
  



// collect user input to form HTTP requests
// use an HTTP request's reponse to display data to the user
// Handle errors that may occur when working with server-side APIs