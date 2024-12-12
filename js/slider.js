document.addEventListener('DOMContentLoaded', function () {
    new Glide('.glide', {
        type: 'carousel',
        startAt: 0,    
        perView: 3,    
        focusAt: 'center',
        // gap: 20,       
        //autoplay: 3000,
        breakpoints: {  
            920: {
                perView: 2,
            },
            590: {
                perView: 1,
            }
        }
    }).mount();
});