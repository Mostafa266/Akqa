const Navbar = _ =>{
    const  primaryNavItems  = document.querySelectorAll('.nav--primary--list--item ');
    const  nav              = document.getElementById('nav');
    const  sideMenu         = document.getElementById('menu-btn');
    const mediaQuery = window.matchMedia('(max-width: 1024px)');

    Array.from(primaryNavItems).map( (item) => {
        item.addEventListener('click',()=>{
            item.classList.toggle('active')
        })
    })
    sideMenu.addEventListener('click', () =>{
            nav.classList.toggle('active')
    })
    mediaQuery.matches ? nav.classList.add('nav-sideIsOpen') : nav.classList.remove('nav-sideIsOpen')
    window.addEventListener('resize',e => {
        const mediaQuery = window.matchMedia(`(max-width: ${1024}px)`)
        mediaQuery.matches ? nav.classList.add('nav-sideIsOpen') : nav.classList.remove('nav-sideIsOpen')
    })
}

export default Navbar;