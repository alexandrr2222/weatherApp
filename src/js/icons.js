export function initStaticIcons(data) {
  data.forEach((obj) => {
    const entries = Object.entries(obj);
    const [key, value] = entries[0];
    const currentElement = document.querySelector(`.${key}`);
    currentElement.innerHTML = value;
    currentElement.querySelector("svg").setAttribute("fill", "currentColor");
  });
}
export const StaticIconData = [
  {
    favBoxIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8A2,2 0 0,0 20,6M17.94,17L15,15.28L12.06,17L12.84,13.67L10.25,11.43L13.66,11.14L15,8L16.34,11.14L19.75,11.43L17.16,13.67L17.94,17Z" /></svg>`,
  },
  {
    searchIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>`,
  },
  {
    closeIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>`,
  },
  {
    settingsButton: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" /></svg>`,
  },
  {
    tempSettingIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5C10.8 5 11.6 5.2 12.4 5.4M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19C20.66 19 22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12C5 14.8 7.2 17 10 17C12.8 17 15 14.8 15 12C15 9.2 12.8 7 10 7M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z" /></svg>`,
  },
  {
    speedUnitSettingIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z" /></svg>`,
  },
  {
    starIconEmpty: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" /></svg>`,
  },
  {
    starIconFull: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>`,
  },
  {
    currentLocationIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>`,
  },
];
export const animatedIcons = [
  {
    sunnyIcon: `<?xml version="1.0" encoding="utf-8"?><svg fill="none" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><defs /><g transform="matrix(1,0,0,1,128,128)" id="bond"><g id="bond"><rect height="256" width="256" y="0" x="0" /></g></g><g id="Oval"><g transform="translate(128,128)"><g transform="scale(1,1)"><animateTransform repeatCount="indefinite" type="scale" attributeName="transform" dur="3s" begin="0s" calcMode="spline" values="1 1; 1.03 1.03; 1 1; 1.03 1.03; 1 1" keyTimes="0; 0.25; 0.5; 0.75; 1" keySplines="0.333 0 0.833 0.833; 0.333 0 0.833 0.833; 0.333 0 0.833 0.833; 0.333 0 0.833 0.833" fill="freeze" /><g transform="translate(0,0)"><g id="Oval"><ellipse ry="102.4" rx="102.4" cy="0" cx="0" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="4.571" stroke-opacity="1" stroke="#fff5da" /></g></g></g></g></g><g id="Oval"><g transform="translate(127.435,127.435)"><g transform="scale(0.98,0.98)"><animateTransform repeatCount="indefinite" type="scale" attributeName="transform" dur="3s" begin="0s" calcMode="spline" values="0.98 0.98; 1.01 1.01; 0.98 0.98; 1.01 1.01; 0.98 0.98" keyTimes="0; 0.222; 0.472; 0.722; 1" keySplines="0 0 1 1; 0.333 0 0.833 0.833; 0.333 0 0.833 0.833; 0.333 0 0.833 1" fill="freeze" /><g transform="translate(0,0)"><g id="Oval"><ellipse ry="90.455" rx="90.455" cy="0" cx="0" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="8.533" stroke-opacity="1" stroke="#ffdb77" /></g></g></g></g></g><g id="Oval "><g transform="translate(127.43,127.43)"><g transform="scale(1,1)"><animateTransform repeatCount="indefinite" type="scale" attributeName="transform" dur="3s" begin="0s" calcMode="spline" values="1 1; 1.03 1.03; 1 1; 1.03 1.03; 1 1" keyTimes="0; 0.194; 0.444; 0.694; 1" keySplines="0.333 0 0.833 0.833; 0.333 0 0.833 0.833; 0.333 0 0.833 0.833; 0.333 0 0.833 0.833" fill="freeze" /><g transform="translate(0,0)"><g id="Oval "><ellipse ry="76.8" rx="76.8" cy="0" cx="0" fill="#ffc930" fill-opacity="1" /></g></g></g></g></g></svg>`,
  },
];
