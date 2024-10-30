// Tags
const searchTags = [];

// Individual elements
let parentElement = null;
const tagLists = Array.from(document.querySelectorAll("article .tags"));

// Search Functions

/*
funtion used to grab the search parameter for the tag. This allows for the search to occur 
*/
function initializeSearch(newParentElement) {
  const params = new URLSearchParams(window.location.search);
  if (newParentElement === null) {
    console.error(
      "Cannot insert tags, parent element is null",
      params.getAll("tag")
    );
    return;
  }

  parentElement = newParentElement;
  for (const tag of params.getAll("tag")) {
    addSearchTerm(tag);
  }
}

/* 
hideArticles is used to hide articles that do not have the
searched tag
*/
function hideArticles() {
  if (searchTags.length === 0) {
    for (const article of document.querySelectorAll("article")) {
      article.classList.remove("hidden");
    }
    return;
  }

  const articlesWithTags = [];
  for (const tag of searchTags) {
    articlesWithTags.push(...findArticlesWithTag(tag));
  }

  /**
   * use querySelectorAll to select all articles
   * iterate over them in a for loop
   * check if articlesWithTags array does not include the current article being iterated over,
   * then add "hidden" to that article's classList
   * else, remove "hidden" from that article's classList
   */

  for ( article of document.querySelectorAll("article")){
    console.log(article)
    if (articlesWithTags.includes(article)){
      article.classList.remove("hidden");
    }else{ 
      (article.classList.add("hidden"));
    }
  }
}

/*
 * Creates a clickable tag button for a given search term (text). When clicked,
 * the button will remove the corresponding tag from both the DOM and the searchTags array.
 * This function also calls hideArticles to update the articles displayed after removal.
 */
function createTag(text) {
  /**
   * create a new element called button
   * add the class "tag" to its classList
   * set the button's textContent property to text (the passed in argument)
   */
  

  const button = document.createElement("button")
  button.classList.add("tag")
  button.textContent = text;

  function remove() {
    button.remove();
    const index = searchTags.indexOf(text);
    if (index !== -1) {
      searchTags.splice(index, 1);
    }
    hideArticles();
  }

  /**
   * add a click event listener to the button, and set the listener to the remove function.
   * return the button element 
   */

  button.addEventListener("click", remove)
  return button;

}

/* 
Function is called if a certain tag is inputted
*/
function findArticlesWithTag(phrase) {
  const articles = [];
  const sanitizedPhrase = phrase.toLowerCase().trim();
  for (const tl of tagLists) {
    const tags = Array.from(tl.querySelectorAll("li"));
    for (const tag of tags) {
      if (tag.textContent.toLowerCase().trim() === sanitizedPhrase) {
        articles.push(tl.parentElement);
        break;
      }
    }
  }

  return articles;
}


/* 
Creates a "tags" based on the text used as an input in the Website.
This is then pushed to a list of "tags" that have been "searched"
It later calls the hideArticles to hide the articles that do not match
the searched tags. 
*/ 
function addSearchTerm(text) {
  parentElement.appendChild(createTag(text));
  searchTags.push(text);
  hideArticles();
}


/*
Function occurs when the user is trying to input a text in the website. 
It handles the enter feature, passing the input value to 
addSearchTerm
*/
function onSearch(event) {
  const input = event.currentTarget;
  /**
   * If event.key equals "Enter":
   * call addSearchTerm and pass the input element's value
   * set input value to an empty string
   */
  // write your code here
  if (event.key == "Enter"){
    addSearchTerm(input.value)
    input.value = ''
  }
}

// Main function
// Forever running while in the site
//It is always listining for a keypress, passing that to 
//onSearch

function main() {
  initializeSearch(document.querySelector("#searched-tags"));
  document
    .querySelector("input[type=search]")
    .addEventListener("keypress", onSearch);
}

// Execute main function
main();

/**
 * Order of execution for each event:
 * Pressing Enter: onSearch()-> addSearchTerm() -> hideArticles() 
 * Clicking to Remove a Tag: onSearch() -->  hideArticles() --> remove()
 * Loading the Page: main() -> initializeSearch() -> addSearchTerm() -> hideArticles()
 */