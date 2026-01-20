import './style.css';
import { renderSidebar } from './UI/sidebar.js';
import { renderMainContent } from './UI/mainContent.js';
import './UI/butttonHandler.js';

// const body = document.querySelector("body");
// body.append(
//     renderSidebar(),
//     renderMainContent(),
// )
document.addEventListener("DOMContentLoaded", () => {
    renderSidebar();
    renderMainContent();
});