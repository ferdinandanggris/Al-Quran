const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click',function(){
    navMenu.classList.toggle('hidden');
})



const templateBookmark = function (nama,surat,ayat) {
    return`
    <li class="group mb-3 list-none">
        <a href="/?surat=${surat}#ayat-${ayat}" class="
        text-base mx-5 flex justify-center hover:text-teal-500 text-slate-900">${nama}:${ayat}
        </a>
    </li>`
}

const emptyBookmark = function(){
    return `
    <li class="group mb-3">
        <p class="text-base mx-5 flex justify-center text-slate-600">No Data Found.
        </p>
    </li>`
}

const bookmark = document.querySelector('#bookmark');
const bookmarkBtn = document.querySelector('#bookmark-btn');
const listBookmark = document.querySelector('#list-bookmark');
bookmarkBtn.addEventListener('click',function () {
    bookmark.classList.toggle('hidden');
    if(getCookie("lastRead")&&(getCookie("lastRead") != null)){
        let data = getCookie("lastRead");
        let [nama,surat,ayat]=data.split(",");
        listBookmark.innerHTML = templateBookmark(nama,surat,ayat);
    }else{
        listBookmark.innerHTML = emptyBookmark();
    }
})

function getCookie(n) {
    let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
    return a ? a[1] : false;
}

const isPermanentCookie = function (name,ayat) {
    let nama = document.querySelector('#judul-surat').innerHTML;

    let currentYear = (new Date().getFullYear()+3);
    let expires = (new Date(currentYear,12,12)).toUTCString;

    let url_string = window.location;
    let url = new URL(url_string);
    let surat = url.searchParams.get('surat') || 1;
    document.cookie = name + '=' +nama+","+surat+","+ayat + ';path=/;expires='+ expires;
} 

const tandai = function (nomor) {
    const valid =confirm('Apakah anda yakin menandai ayat berikut ?');
    if (!valid) {
        return;
    }
    isPermanentCookie('lastRead',nomor);
    
}



// Templates

// Template List Surat 
    const templateSurat = function(nama,nomor,addClass = ""){
        return `
    <li class="group mb-3">
        <a id="surat-${nomor}" href="/?surat=${nomor}" class="py-3 ${addClass} border rounded-lg
        text-base mx-5 border-teal-500 flex justify-center hover:bg-teal-500 hover:text-white text-teal-500">${nama}
       </a>
    </li>`
    }
// Template List Surat 


// Template List Ayat
const templateListAyat = function(nomor){
   return `<option value="#ayat-${nomor}">${nomor}</option>`
}
// Template List Ayat



// Template Ayat
const templateAyat = function(nomor,ayat,arti,audio){
return `
<section id="ayat-${nomor}" class="w-full px-4 mb-3 scroll-m-20">
<div class="overflow-hidden pb-3 rounded-md bg-white">
    <div class="flex flex-wrap justify-between w-full">
        <div class=" text-center text-white">
            <div class="w-10 bg-teal-500 rounded-sm">${nomor}</div>
        </div>
        <div class="text-center text-white flex flex-between">
            <button onclick="tandai(${nomor})" title="tandai">
                <div class="w-10 bg-teal-500 flex justify-center"><svg class="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgb(255, 255, 255);"><path d="M17 2H7a2 2 0 0 0-2 2v18l7-4.848L19 22V4a2 2 0 0 0-2-2zm-1 9h-3v3h-2v-3H8V9h3V6h2v3h3v2z"></path></svg></div>
            </button>
            <button onclick="location='#'" title="Kembali ke Atas">
            <div class="w-10 bg-teal-500 flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgb(255, 255, 255);transform: ;msFilter:;"><path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path></svg></div>
        </button>
        </div>
    </div>
    <p class="px-3 font-arab text-3xl py-3 leading-loose" style="direction: rtl;">${ayat}</p>
    <hr class="my-4 px-3 "> 
    <h3 class="text-base my-3 px-3">${arti}</h3>
    <hr class= "px-3">
    <audio src="${audio}" controls  class="px-3 w-56 my-3"></audio>
</div>
</section>`};
// Template Ayat

// Ayat Err
const errAyat =`<div class="h-[47vh] w-full m-auto flex item">
                    <p class="m-auto text-slate-600 text-center block">No Data Found..</p>
                </div>`;
// Ayat Err


// Templates

// get Surat
const listSurat = document.querySelector('#list-surat');
const cariSurat = document.querySelector('#cari-surat');
let listSuratTemp = "";
fetch("dist/js/surat.json")
.then((data) => data.json())
.then((data) => {
    let url_string = window.location;
    let url = new URL(url_string);
    let surat = url.searchParams.get('surat') || 1;
    data.data.forEach((element) => {
    listSuratTemp += templateSurat(element.surat,element.nomor);
    listSurat.innerHTML = listSuratTemp;
    });
    const activeSurat = listSurat.querySelector("#surat-"+surat);
    activeSurat.classList.add('isActive');
});



let search= "";
cariSurat.addEventListener('keyup',function () {
    search =this.value;
    let listSuratTemp = "";
    fetch("dist/js/surat.json")
    .then((data) => data.json())
    .then((data) => {
        let bahan = data.data;
        let filtered = data.data.filter(bahan => bahan.surat.includes(search));
        filtered.forEach((element) => {
        listSuratTemp += templateSurat(element.surat,element.nomor);
        });
        listSurat.innerHTML = listSuratTemp;
        const activeSurat = listSurat.querySelector("#surat-"+surat);
        activeSurat.classList.add('isActive');
    });
})



// 



// get Ayat
const ayat = document.querySelector('#ayat');
const judulSurat = document.querySelector('#judul-surat');
const listAyat = document.querySelector('#list-ayat')
let ayatTemp = "";
let listAyatTemp = "";


let url_string = window.location;
let url = new URL(url_string);
let surat = url.searchParams.get('surat') || 1;
fetch("https://api.quran.sutanlab.id/surah/"+ surat)
  .then((response) => response.json())
  .then((data) => {
    judulSurat.innerHTML = data.data.name.transliteration.id;
    data.data.verses.forEach((element) => {
      listAyatTemp += setTemplateListAyat(element.number.inSurah);
      ayatTemp += setTemplateAyat(
        element.number.inSurah,
        element.text.arab,
        element.translation.id,
        element.audio.primary
      );
    });
    ayat.innerHTML = ayatTemp;
    ayatTemp = "";
    listAyat.innerHTML = listAyatTemp;
    listAyatTemp = "";

    if(location.hash !== ""){
        const el = document.querySelector(location.hash);
    if (el !== null) {
    el.scrollIntoView();
    }
}
  })
  .catch((err) => {
      ayat.innerHTML = errAyat;
  });





// push to HTML 
const setTemplateAyat = function(nomor,ayat,arti,audio){
    return templateAyat(nomor,ayat,arti,audio);
}
const setTemplateListAyat = function(nomor){
    return templateListAyat(nomor);
}




