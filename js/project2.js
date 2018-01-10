"use strict";

//Constant variables 
const pageList = document.querySelector('ul');
const eachStudent = pageList.children;
const buttonDiv = document.querySelector('.pagination');
const buttonUl = buttonDiv.querySelector('ul');
const studentsPerPage = 10;
const searchDiv = document.querySelector('.student-search');
const noResultDiv = document.querySelector('.no-results');
var pagesNumbersList;
var studentList = document.getElementsByClassName('student-list')[0];
var studentNumber = studentList.children.length;

//Hide all but the first 10 students in the list.
function showFirstTen() {
for (let i = 0; i < eachStudent.length; i++) {
    if (i < studentsPerPage) {
        eachStudent[i].style.display = '';
    } else {
        eachStudent[i].style.display = 'none';
    }
}
var a = document.querySelectorAll('ul li a');
a[0].classList.add('active');
}

//How to calculate the number of pages needed.
function amountOfPages() {
    let pages = Math.ceil(eachStudent.length / studentsPerPage);
    return pages;
}

//When a user clicks on the other pages, next 10 student should be shown.
for (let i = 1; i <= amountOfPages(); i++) {
    let pageli = document.createElement('li');
    let pageLink = document.createElement('a');
    pageLink.className = '';
    pageLink.href = '#';
    pageLink.textContent = i;
    buttonUl.appendChild(pageli);
    pageli.appendChild(pageLink);
    pagesNumbersList = document.querySelectorAll('ul li a');
    pagesNumbersList.forEach(activePage, eachStudent);
}

// How to get the links to be active
function activePage(item){
    item.onclick = function(){
        for(var i=0; i<studentNumber; i++){
            studentList.children[i].style.display = 'none';
        }
    	for(var i=0; i<pagesNumbersList.length; i++){
            pagesNumbersList[i].classList.remove('class', 'active');
        }
    	item.classList.add('active');
        var pageNumber = parseInt(item.innerHTML);
        var start = (pageNumber * 10) - 10;
        var end = (pageNumber * 10);
        for(var i=start; i<end; i++){
            studentList.children[i].style.display = 'block';
        }
    }
}

//Event listener used to divide students among the pages
buttonDiv.addEventListener('click', (event) => {
    noResultDiv.innerHTML = '';
    let buttonNumber = parseInt(event.target.textContent);
    let max = buttonNumber * 10;
    let min = max - 10;
    for (let i = 0; i < eachStudent.length; i++) {
        if (i >= min && i < max) {
            eachStudent[i].style.display = '';
        }  else {
            eachStudent[i].style.display = 'none';
        }
    }
});

//Search component so that a user could search for a particular student or students
let searchInput = document.createElement('input');
let searchButton = document.createElement('button');
function showSearch() {
    searchInput.placeholder = 'Search up students...';
    searchButton.textContent = 'Search';
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
}

// Event listener for search box
// Array to hide students
const searchResults = [];
searchButton.addEventListener('click', () => {
    let filter = searchInput.value.toLowerCase();
    searchResults.length = 0;
    for (let i = 0; i < eachStudent.length; i++) {
        if (eachStudent[i].innerHTML.indexOf(filter) > -1) {
            eachStudent[i].style.display = '';
    	} else {
            eachStudent[i].style.display = 'none';
            searchResults.push(i);
        }
    }

    // If no students match the search results, a 'student not found' message is displayed
    if (searchResults.length === eachStudent.length) {
        noResultDiv.innerHTML = '<h1>Student Not Found</h1>';
    } else {
        noResultDiv.textContent = '';
    }
});

// Function call to display first ten students on load
showFirstTen();

// Function call to show search box if JavaScript is enabled
showSearch();
