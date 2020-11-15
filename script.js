const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let imagesLoad=0;
let totalImages=0;
let photoArray = [];

//Unsplash API
let count = 5;
const apiKey = 'VD_Ay475iB0wxmmvGkyO3XcY3FHsa6ZXWX6YrErKims';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if  all image were loaded
function imageLoad() {
    console.log('image loaded');
    imagesLoad++;

    if(imagesLoad === totalImages){
        ready=true;
        loader.hidden=true;
        count=30;
        console.log('ready=',ready);
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

   

/* Help Function to Set Attributes on DOM Element  */
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for Link & Photos, Add to DOM
function displayPhotos() {
    imagesLoad=0;
    totalImages=photoArray.length; 
    console.log('total images', totalImages);
    // Run function for each object in photoArray
    photoArray.forEach((photo) => {
        // Create <a> to link Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load',imageLoad);

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
     
    });
}


//Get photos from Unsplash API  
async function getPhotosFromAPI() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
        console.log(photoArray);
    } catch (error) {

    }
}

//  Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight - 1000) && ready) {
        ready=false;
        getPhotosFromAPI();
        console.log('load more');
    }
});

getPhotosFromAPI();