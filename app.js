function openPage(page){

document.querySelectorAll("section").forEach(sec=>{
sec.classList.add("hide")
})

document.getElementById(page).classList.remove("hide")

}
