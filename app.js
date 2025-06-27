const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");
const sliderControls = document.querySelector(".slider-controls");
const pageNumber = document.querySelector(".page-number");


//Update the indicator height and width
const updateIndicator = (tab, index) => {
    sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
    sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;

    const scrollLeft = sliderTabs[index].offsetLeft - sliderControls.offsetWidth / 2 + sliderTabs[index].offsetWidth / 2;
    sliderControls.scrollTo({left: scrollLeft, behavior: "smooth"});

    // sliderTabs.forEach(t => t.classList.remove("active"));
    // tab.classList.add("active");
}



// Initialize swiper instance
const swiper = new Swiper(".slider-container", {
    effect: "fade",
    speed: 1300,
    autoplay: {delay: 4000},
    navigation: {
        prevE1: "slide-prev",
        nextE1: "slide-next",
    },
    on: {
        //Update the indicator on slide change
        slideChange: () => {
            const currentTabIndex = [...sliderTabs].indexOf(sliderTabs[swiper.activeIndex]);
            updateIndicator(sliderTabs[swiper.activeIndex])(currentTabIndex);
        },
        reachEnd: () => swiper.autoplay.stop(),
    }
    // loop: true,
    // pagination: { el: '.slider-pagination',
        // clickable: true,
    // }
});

//Update the slide and pagination on tab click
sliderTabs.forEach((tabs, index) => {
    tabs.addEventListener("click", () => {
        swiper.slideTo(index);
        updateIndicator(tabs, index);
    });
})

updateIndicator(sliderTabs[0], 0);
window.addEventListener("resize",() => updateIndicator(sliderTabs[swiper.activeIndex], 0));
