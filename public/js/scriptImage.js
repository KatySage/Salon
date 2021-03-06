'use strict';

const imageDiv = document.querySelector('.images');
// const searchTerm = document.getElementById('searchTerm').value;
let number = document.getElementById('page_number').value
let searchTerm = document.getElementById('searchTerm').value
console.log(number)

const search = async (searchTerm, number) => {
    let searchUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&page=${number}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    return data;
};

const getObject = async (objID) => {
    let objectUrl = `https://api.artic.edu/api/v1/artworks/${objID}
    `;
    const response = await fetch(objectUrl);
    const data = await response.json();
    return data;
};

(async function () {
    // search() returns a promise, so we need to `await` it
    if (number === "1"){
        console.log(searchTerm)
        localStorage.setItem("searchTerm", searchTerm)
        const searchData = await search(searchTerm, number);  
        let objectArray = [];
    searchData.data.map(async (objID) => {
        objectArray.push(objID.id);
    });
    console.log(objectArray);
    objectArray.map(async (object) => {
        const objectData = await getObject(object);
        console.log(object);
        const smallImage = objectData.data.thumbnail.url;
        console.log(smallImage);
        const url = smallImage + '/full/full/0/default.jpg';
        const link = document.createElement('a');
        link.setAttribute('href', `/image/${object}`);
        const image = document.createElement('img');
        image.setAttribute('src', url);
        image.className += 'thumbnail';
        imageDiv.appendChild(link);
        link.appendChild(image);
    });
} else {
    let searchTerm = localStorage.getItem("searchTerm")
    console.log(searchTerm)
    const searchData = await search(searchTerm, number);
    let objectArray = [];
    searchData.data.map(async (objID) => {
        objectArray.push(objID.id);
    });
    console.log(objectArray);
    objectArray.map(async (object) => {
        const objectData = await getObject(object);
        console.log(object);
        const smallImage = objectData.data.thumbnail.url;
        console.log(smallImage);
        const url = smallImage + '/full/full/0/default.jpg';
        const link = document.createElement('a');
        link.setAttribute('href', `/image/${object}`);
        const image = document.createElement('img');
        image.setAttribute('src', url);
        image.className += 'thumbnail';
        imageDiv.appendChild(link);
        link.appendChild(image);
    });
}
})();
