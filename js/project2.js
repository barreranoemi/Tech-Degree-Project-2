"use strict";

// Constants needed
const pageList = document.querySelector('ul');
const eachStudent = pageList.children;
const buttonDiv = document.querySelector('.pagination');
const buttonUl = buttonDiv.querySelector('ul');
const studentsPerPage = 10;
var pagesNumbersList;
var studentList = document.getElementsByClassName('student-list')[0];
var studentNumber = studentList.children.length;
const pageHeaderDiv = document.querySelector('.page-header');

var searchButton = document.createElement('button');
searchButton.setAttribute('class', 'student-search')
var searchInput = document.createElement('input');
searchInput.setAttribute('placeholder', 'search up Students');
var noResult = document.createElement('div');
noResult.setAttribute('class', 'noResultDiv');
pageHeaderDiv.appendChild(noResult);

const searchDiv = document.querySelector('.student-search');
const noResultDiv = document.querySelector('.noResultDiv');

function showSearch() {
searchButton.textContent = 'Search';
searchButton.setAttribute('placeholder', 'search up Students...');
pageHeaderDiv.appendChild(searchButton);
pageHeaderDiv.appendChild(searchInput);
}

var div = document.createElement('div');
 document.body.appendChild(div);

// Determining the amount of pages needed based on the number of students
function amountOfPages() {
    let pages = Math.ceil(eachStudent.length / studentsPerPage);
    return pages;
}

// Function to show first ten students
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

// Loop to create page links based on number of pages needed
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

// Using event listener to divide students among the pages
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

// // How to display the search box dynamically
// let searchInput = document.createElement('input');
// let searchButton = document.createElement('button');
// function showSearch() {
//     searchInput.placeholder = 'Search up students...';
//     searchButton.textContent = 'Search';
//     searchDiv.appendChild(searchInput);
//     searchDiv.appendChild(searchButton);
// }

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