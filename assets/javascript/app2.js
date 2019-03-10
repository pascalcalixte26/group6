//Function to generate random background image

function randomImage(){
    var images = [
        'assets/images/image_3.jpg',
        'assets/images/image_2.jpg',
        'assets/images/image_4.jpg',
        'assets/images/image_8.jpg',
        'assets/images/image_5.jpg'
    ];

    var size = images.length;
    var i = Math.floor(size * Math.random());
    console.log(i);

    var element = document.getElementById('home');
    console.log(element);
    element.style['background-image'] = "url("+ images[i] +")";
}

randomImage()