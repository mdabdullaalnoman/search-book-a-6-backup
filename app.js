// Load books info by clicking btn----------------------------------
document.getElementById('search-btn').addEventListener('click', function () {
    const searchValue = document.getElementById('search-fild').value;

    // display loading
    toggleLoading('block');
    document.getElementById('search-count').innerText = 'searching...';

    // clear books 
    const section = document.getElementById('search-result');
    section.innerHTML = '';

    fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
        .then(res => res.json())
        .then(data => displayResult(data))

});


// toggle loading
const toggleLoading = (display) => {
    document.getElementById('loading').style.display = display;
}


// display search result
const displayResult = (data) => {
    const counter = document.getElementById('search-count');
    counter.classList.add('counter');

    // error handle
    if (data.numFound === 0) {
        counter.innerText = 'Not Found';
        counter.style.color = 'red';
        toggleLoading('none');
    } else {
        counter.innerHTML = data.numFound;
    }


    const section = document.getElementById('search-result');
    section.innerHTML = '';

    const searchBooks = data.docs;
    console.log(searchBooks);

    searchBooks.forEach(element => {
        console.log(element);
        const div = document.createElement('div');
        div.classList.add('books-info');

        div.innerHTML = `
            <div style="text-align:center;">
               <img style="border-radius:10px;" src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" alt="no-images"></img>
            </div>
            <h3> Book Name : <span class="title">${element.title}</span></h3>  
            <h3>Author Name : <span class="title">${element?.author_name?.[0] ? element?.author_name?.[0] : 'Not Avilable'}</span></h3> 
            <h3>First Publish Year : <span class="title">${element.first_publish_year}</span></h3> 
            <h3>Publisher : <span class="title">${element.publisher?.[0] ? element.publisher?.[0] : 'Not Avilable'}</span></h3> 
        `
        section.appendChild(div);

        document.getElementById('search-fild').value = '';
        toggleLoading('none');
    });
};


{/* <h2> Book Name : <span class="title">${element?.author_name[0]}</span></h2>
<h3> Publish Year : <span class="title">${element.first_publish_year ? element.first_publish_year : 'not found' }</span></h3> 
<h2> Book Name : <span class="title">${element?.publish_date[0]}</span></h2> */}

// let arrayItem = arr?.[42];
// Programming Hero18:12
// const obj = {
// 	name:'x'
// }

// obj.name?obj.name : 'not fount' // output: x

// obj.age?obj.age: 'not found' // output: not found