// reference to the issue container to display <a> dom elements
var repoNameEl = document.querySelector("#repo-name");
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");


var getRepoName = function() {
    // assigned query string to variable
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    // passing repoName into getRepoIssues function, using repoName to fetch issues from GitHub API
    if (repoName) {
        // display repo name on the page
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    } else {
        // if no repo was given, redirect to the homepage
        document.location.replace("./index.html");
    }

    // console.log(repoName);
};
var getRepoIssues = function(repoName) {
    var apiUrl = "https://api.github.com/repos/" + repoName + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function
                displayIssues(data);
                // check if api has paginated issues
                if (response.headers.get("link")) {
                    displayWarning(repoName);
                }
            });
        } else {
            // if not successful, redirect to homepage
            document.location.replace("./index.html");
        }
    });
    //console.log(repo);
};

// function that accepts a parameter called issues
var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    // loop over response data (given issues)
    for (var i = 0; i<issues.length; i++) {
        // create a link element to take users to the issues on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

    // adding content to <a> elements
    // create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // apend to container
        issueEl.appendChild(titleEl);

    // create a type element
    var typeEl = document.createElement("span");
    
    // check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
    } else {
        typeEl.textContent = "(Issue)";
    }
    
    // append to container
        issueEl.appendChild(typeEl);

    // append to issueContainerEl
    issueContainerEl.appendChild(issueEl);
}

};
// function displaying more than 30 repo warning with a repo parameter
var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    // create link element
    var linkEl  = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoName();
// hardcoded function call
// getRepoIssues();

