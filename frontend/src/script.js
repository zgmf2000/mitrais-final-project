function toggleMenu()
{
    var width = window.innerWidth;

    if (width <= 1024)
    {
        var sideMenu = document.getElementsByClassName("sidebar")[0];
        var sideMenuCover = document.getElementById("sidebar-cover");

        sideMenu.classList.toggle("shown");
        sideMenuCover.classList.toggle("shown");
    }
}