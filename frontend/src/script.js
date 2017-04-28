function toggleMenu()
{
    var width = window.innerWidth;

    if (width <= 1024)
    {
        var sideMenu = document.getElementsByClassName("sidebar")[0];
        sideMenu.classList.toggle("shown");
    }
}