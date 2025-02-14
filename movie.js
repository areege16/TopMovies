var imgList = document.getElementsByClassName("img-item");
// console.log(imgList);
var lightboxContainer = document.querySelector(".lightbox-container");
var lightBoxItems = document.querySelector(".light-box-items");
var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");
var closeButton = document.getElementById("close");

var MyHttp = new XMLHttpRequest();
var allPosts = [];

MyHttp.open(
  "GET",
  "https://api.themoviedb.org/3/trending/all/week?api_key=f1aca93e54807386df3f6972a5c33b50"
);
MyHttp.send(); //intiate request

MyHttp.addEventListener("readystatechange", function () {
  if (MyHttp.readyState == 4 && MyHttp.status == 200) {
    allPosts = JSON.parse(MyHttp.response).results;
    display();
  }
});

function display() {
  container = ``;
  for (var i = 0; i < allPosts.length; i++) {
    container += `
             <div class="col-md-3">
                 <div class="item">
       <img  style="h" class="w-100 img-item" src="https://image.tmdb.org/t/p/w500${allPosts[i].backdrop_path}"alt="">

                        <h3>${allPosts[i].title}</h3>
                        <h4>Media Type: <span> ${allPosts[i].media_type}</span></h4>
                        <h4>Original Language :<span>${allPosts[i].original_language}</span></h4>
                        <h4>Rate:<span>${allPosts[i].vote_average}</span> </h4>
                        <p>Overview :<span>${allPosts[i].overview} </span></p>

                </div>
            </div>

        `;
  }
  document.getElementById("ContainerMovie").innerHTML = container;
  setUpImgList();
}

var currentIndex = 0;

function setUpImgList() {
  for (var i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener("click", function (e) {
      currentIndex = Array.from(imgList).indexOf(e.target);
      console.log(currentIndex);
      var imgSrc = e.target.getAttribute("src");
      lightboxContainer.classList.replace("d-none", "d-flex");
      lightBoxItems.style.backgroundImage = `url(${imgSrc})`;
    });
  }
}

function nextImg() {
  currentIndex++;
  if (currentIndex == imgList.length) {
    currentIndex = 0;
  }
  var imgsrc = imgList[currentIndex].getAttribute("src");
  lightBoxItems.style.backgroundImage = `url(${imgsrc})`;
}

nextButton.addEventListener("click", nextImg);

function prevImg() {
  currentIndex--;
  if (currentIndex == -1) {
    currentIndex = imgList.length - 1;
  }
  var imgsrc = imgList[currentIndex].getAttribute("src");
  lightBoxItems.style.backgroundImage = `url(${imgsrc})`;
}
prevButton.addEventListener("click", prevImg);

function close() {
  lightboxContainer.classList.replace("d-flex", "d-none");
}
closeButton.addEventListener("click", close);

document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowRight") {
    nextImg();
  } else if (e.key == "ArrowLeft") {
    prevImg();
  } else if (e.key == "Escape") {
    close();
  }
});


document.addEventListener("click", function (e) {
    if (e.target.tagName === "P") { // إذا تم النقر على عنصر من نوع فقرة
      var fullText = e.target.getAttribute("data-fulltext"); // الحصول على النص الكامل المخفي
      if (!fullText) {
        fullText = e.target.textContent; // احفظ النص الأصلي
        e.target.setAttribute("data-fulltext", fullText);
      }
  
      if (e.target.classList.contains("expanded")) {
        // إذا كان النص بالفعل ممتدًا، قم بتقصيره
        e.target.classList.remove("expanded");
        e.target.textContent = fullText.slice(0, 100) + "..."; // اجعل النص قصيرًا مجددًا
      } else {
        // إذا كان النص مقصوصًا، قم بعرضه بالكامل
        e.target.classList.add("expanded");
        e.target.textContent = fullText; // اعرض النص الكامل
      }
    }
  });
  