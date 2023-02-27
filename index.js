const setHeaderClass = () => {

    const scrollPositionY = window.scrollY;
    const header = document.getElementById("header");

    if (scrollPositionY > 0 && !header.classList.contains("fixed")) {

        header.classList.add("fixed");
    }
    
    if (scrollPositionY === 0) {

        header.classList.remove("fixed");
    }
}

document.addEventListener("scroll", setHeaderClass);