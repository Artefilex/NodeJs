// for button

const menu = document.getElementById("menu");
const login = document.getElementById("login");
const join = document.getElementById("join");
const loginDiv = document.getElementById("login-area");
const register = document.getElementById("register");
const closeBtnJoin = document.getElementById("closeBtn");
const closeBtnLogin = document.getElementById("closeBtnLogin");

const mood = document.getElementById("mood");
const navbar = document.getElementById("navbar");
const termPolicy = document.getElementById("term-policy");

const effectClass = document.querySelector(".effect");
const menuItems = document.querySelector(".navbar-items");
const mainTitle = document.querySelector(".main-title");
const footer = document.querySelector("footer");
const blogArea = document.querySelector(".blog-area");

const closeBtn = document.querySelector(".close-btn");
const forms = document.querySelector(".form-register");

const navbarTag = document.querySelectorAll(".navbar-tag");
const description = document.querySelectorAll(".blog-descr");
const blogLink = document.querySelectorAll(".another-blogs");
const singleBlog = document.querySelectorAll(".blog");
let darkMode = false;
let isOpen = false;
let toggleJoin = false;
let toggleLogin = false;
let toggleWhich = false;

let localTime = new Date();
termPolicy.textContent = localTime.getFullYear();

menu.addEventListener("click", () => {
  isOpen = !isOpen;
  if (isOpen) {
    menuItems.style.display = "flex";
  } else {
    menuItems.style.display = "none";
  }
});

if(closeBtnJoin){
  closeBtnJoin.addEventListener("click", () => {
    location.href = "http://localhost:3000/"
    });
}
if(closeBtnLogin){
  closeBtnLogin.addEventListener("click", () => {
    location.href = "http://localhost:3000/"
    });
}


if(login || join){
  login.addEventListener("click", () => {
    location.href = "http://localhost:3000/login"
  });
  
  join.addEventListener("click", () => {
    location.href= "http://localhost:3000/join"
  });
}

const mainLight = () => {
  mainTitle.children[0].style.background = "var(--main-title)";
  mainTitle.children[1].style.background = "var(--main-title2)";
  mainTitle.children[0].style.webkitBackgroundClip = "text";
  mainTitle.children[1].style.webkitBackgroundClip = "text";
};

const mainDark = () => {
  mainTitle.children[0].style.background = "var(--main-title-dark)";
  mainTitle.children[1].style.background = "var(--main-title-dark2)";
  mainTitle.children[0].style.webkitBackgroundClip = "text";
  mainTitle.children[1].style.webkitBackgroundClip = "text";
};
const iconLight = () => {
  mood.style.background = "var(--bg-light)";
  mood.children[0].classList.add("fa-solid");
  mood.children[0].style.color = "var(--navbar-dark-bg)";
  mood.children[0].classList.remove("fa-regular");
};
const iconDark = () => {
  mood.style.background = "var(--navbar-dark-bg)";
  mood.children[0].style.color = "white";
  mood.children[0].classList.add("fa-regular");
  mood.children[0].classList.remove("fa-solid");
  mood.style.border = "var(--input-border)";
};
const navbarAddLoop = () => {
  document.getElementById("logoimg").style.filter = "invert(1)";
  navbar.classList.add("dark-mode-nav");
  navbarTag.forEach((element) => {
    element.classList.add("dark-mode-tag");
  });
};
const navbarRemoveLoop = () => {
  document.getElementById("logoimg").style.filter = "invert(0)";
  navbar.classList.remove("dark-mode-nav");
  navbarTag.forEach((element) => {
    element.classList.remove("dark-mode-tag");
  });
};

const footerDark = () => {
  footer.style.background = "var(--global-bg-dark)";
};
const footerLight = () => {
  footer.style.background = "var(--footer-light-bg)";
};
const blogDetailDark = () => {
  blogArea.style.border = "var(--dark-border)";
  blogArea.style.background = "var(--global-bg-dark)";
  blogLink.forEach((blog) => {
    blog.style.background = "var(--global-bg-dark)";
    blog.style.border = "var(--dark-border)";
    blog.children[1].style.color = "var(--light-color)";
  });
};
const blogDetailLight = () => {
  blogArea.style.border = "var(--light-border)";
  blogArea.style.background = "var(--card-light)";
  blogLink.forEach((blog) => {
    blog.style.background = "var(--card-light)";
    blog.style.border = "var(--light-border)";
    blog.children[1].style.color = "var(--dark-color)";
  });
};

const formAddLoop = () => {
  forms.classList.add("dark-mode-form");
  forms.parentElement.style.background = "var(--dark-color)";
   document.querySelector("h6").forEach((tag)=>{
    tag.style.color = "var(--light-color)"
    
    }) 
};

const formRemoveLoop = () => {
  forms.classList.remove("dark-mode-form");
  forms.parentElement.style.background = "var(--body-bg-dark)";
  document.querySelector("h6").forEach((tag)=>{
    tag.style.color = "white" 
    }) 
};
const closeBtnLightLoop = () => {
  closeBtn.children[0].style.color = "white";
};
const closeBtnDarkLoop = () => {
  closeBtn.children[0].style.color = "var(--light-color)";
};

const blogDark = ()=>{
  singleBlog.forEach((single) => {
    single.style.border = "var(--dark-border) ";
    single.style.background = "var(--global-bg-dark) ";
   
  });
}
const blogLight = ()=>{
  singleBlog.forEach((single) => {
  
    single.style.border = "var(--light-border) ";
    single.style.background = "var(--card-light)";
  })
};


if(mood){
  mood.addEventListener("click", () => {
    if (mood.children[0].classList.contains("fa-regular")) {
      document.body.classList.remove("dark-mode");
      menuItems.style.background = "var(--navbar-light-bg)";
      effectClass ? (effectClass.style.opacity = "0.25") : "";
      forms && formRemoveLoop();
      forms &&  closeBtnLightLoop();
      mainTitle ? mainLight() : "";
      blogArea && blogDetailLight();
      blogLight() 
      iconLight();
      navbarRemoveLoop();
      footerLight();
    } else {
      document.body.classList.add("dark-mode");
      menuItems.style.background = "var(--navbar-dark-bg)";
      effectClass ? (effectClass.style.opacity = "0.75") : "";
      forms &&   formAddLoop();
      forms &&  closeBtnDarkLoop();
      mainTitle ? mainDark() : "";
      blogDark()
      blogArea && blogDetailDark();
      iconDark();
      navbarAddLoop();
      footerDark();
    }
  });
}


description.forEach((descr) => {
  const fullDesc = descr.textContent;

  const shortDesc = descr.textContent.slice(0, 100) + "...";
  // let fullDescShow = false

  descr.textContent = shortDesc;

  // descr.addEventListener("click", () =>{
  //   if(fullDescShow){
  //     descr.textContent = shortDesc
  //   }else{
  //     descr.textContent = fullDesc
  //   }
  //   fullDescShow = !fullDescShow
  // } )
});
