const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];

//Unsplash API
const count = 10;
const apiKey = 'VD_Ay475iB0wxmmvGkyO3XcY3FHsa6ZXWX6YrErKims';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


/* Help Function to Set Attributes on DOM Element  */
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for Link & Photos, Add to DOM
function displayPhotos() {
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

getPhotosFromAPI();