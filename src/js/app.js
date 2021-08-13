// global components
import './components/loader';
// Import Pages 
import Home from './pages/home';
import './vendors/userway';

// Check if homepage is Rendered
let body = document.getElementsByTagName('body')[0];

body.classList.contains('home_page') ? Home() : '';
// Check Example to know hoe import pages and run script separately
// body.classList.contains('about_page') ? About() : '';
document.onkeydown = e =>{e.key === (13) ? document.activeElement.click() : ''};
