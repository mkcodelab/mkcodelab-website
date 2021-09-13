const projectSlider = document.querySelector('#project-slider');
const navLeft = document.querySelector('#projLeft');
const navRight = document.querySelector('#projRight');

const projects = [
  {
    name: 'Space Defender',
    descr: 'Gra typu planet defense, osadzona w przestrzeni kosmicznej',
    link: 'https://mkcodelab.github.io/Space-Defender/',
    img: 'img/spacedefender.png',
    alt: 'spaceDefender.png'
  },
  {
    name: 'Backmasking',
    descr: 'Apka, dzięki której możesz wgrać swój plik muzyczny i odtworzyć go wspak',
    link: 'https://mkcodelab.github.io/Backmasking/',
    img: 'img/backmasking.png',
    alt: 'backmasking.png'
  },
  {
    name: 'Vue.js Color Picker',
    descr: 'Color picker napisany w vue, rgba, hsla, hex',
    link: 'https://mkcodelab.github.io/vue.js-color-picker/',
    img: 'img/colorpicker.png',
    alt: 'colorpicker.png'
  },
  {
    name: 'Background Generator',
    descr: 'Apka do tworzenia tła ekranu.',
    link: 'https://mkcodelab.github.io/Background-Generator/',
    img: 'img/backgroundgen.png',
    alt: 'backgroundgen.png'

  },
  {
    name: 'Artifact Creator',
    descr: 'Stwórz swój własny artefakt',
    link: 'https://mkcodelab.github.io/Artifact-Creator/',
    img: 'img/artifact-creator.png',
    alt: 'artifact-creator.png'
  }
]

let current = 0;
projectSlider.innerHTML = `
<h1 class="project-title">${projects[current].name}</h1>
<a class="project-link" href="${projects[current].link}">
  <img class="project-img" src="${projects[current].img}" alt="bgMaker.jpg">
</a>
<p class="project-descr">${projects[current].descr}</p>
`

function moveTo(project) {
  projectSlider.innerHTML = `
  <h1 class="project-title">${projects[project].name}</h1>
  <a class="project-link" href="${projects[project].link}">
    <img class="project-img" src="${projects[project].img}" alt="bgMaker.jpg">
  </a>
  <p class="project-descr">${projects[project].descr}</p>
  `
}
navRight.addEventListener('click', ()=> {
  if (current >= projects.length-1) current = 0;
  else current ++;
  // console.log('current project is', current)
  moveTo(current)
});

navLeft.addEventListener('click', ()=>{
  if (current == 0) current = projects.length-1;
  else current --;
  // console.log('current project is', current)
  moveTo(current)
})