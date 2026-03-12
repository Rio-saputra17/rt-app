const { createClient } = supabase

const db=createClient(
"https://ocjspifnqtlevnupqmye.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9janNwaWZucXRsZXZudXBxbXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDk4MDgsImV4cCI6MjA4ODgyNTgwOH0.PbtGLNW1XuqU7N-tvbdW23To5XH9wG0LPF1mF-A9B8Q"
)

let wargaData=[]

function login(role){

let pass=prompt("Masukkan password")

if(role==="warga" && pass==="RT03"){
startApp()
}

else if(role==="admin" && pass==="RTKU"){
startApp()
document.getElementById("formTambah").classList.remove("hide")
}

else{
alert("Password salah")
}

}

function logout(){
location.reload()
}

function startApp(){

document.getElementById("login").style.display="none"
document.getElementById("app").style.display="block"

loadDashboard()
loadWarga()
loadKas()
loadIuran()

}

function openPage(id){

document.querySelectorAll("section").forEach(s=>s.classList.add("hide"))
document.getElementById(id).classList.remove("hide")

}



async function loadWarga(){

let {data}=await db.from("warga").select("*")

wargaData=data||[]

let html=""

wargaData.forEach(w=>{

html+=`
<tr>
<td>${w.nama}</td>
<td>${w.alamat}</td>
<td>${w.kontak}</td>
</tr>
`

})

document.getElementById("tableWarga").innerHTML=html

}



function searchWarga(){

let key=document.getElementById("searchWarga").value.toLowerCase()

let filter=wargaData.filter(w=>w.nama.toLowerCase().includes(key))

let html=""

filter.forEach(w=>{

html+=`
<tr>
<td>${w.nama}</td>
<td>${w.alamat}</td>
<td>${w.kontak}</td>
</tr>
`

})

document.getElementById("tableWarga").innerHTML=html

}



async function tambahWarga(){

let nama=document.getElementById("namaWarga").value
let alamat=document.getElementById("alamatWarga").value
let kontak=document.getElementById("kontakWarga").value

await db.from("warga").insert([{nama,alamat,kontak}])

loadWarga()
loadDashboard()

}



async function bayarIuran(){

let nama=document.getElementById("namaBayar").value
let jumlah=parseInt(document.getElementById("jumlahBayar").value)

await db.from("iuran").insert([{nama,jumlah}])

await db.from("kas").insert([{
keterangan:"Iuran "+nama,
masuk:jumlah,
keluar:0
}])

loadKas()
loadIuran()
loadDashboard()

}



async function loadIuran(){

let {data}=await db.from("iuran").select("*")

let html=""

data.forEach(i=>{

html+=`
<tr>
<td>${i.nama}</td>
<td>Lunas</td>
</tr>
`

})

document.getElementById("tableIuran").innerHTML=html

}



async function loadKas(){

let {data}=await db.from("kas").select("*")

let html=""

data.forEach(k=>{

html+=`
<tr>
<td>${k.keterangan}</td>
<td>${k.masuk||0}</td>
<td>${k.keluar||0}</td>
</tr>
`

})

document.getElementById("tableKas").innerHTML=html

}



async function loadDashboard(){

let {data:warga}=await db.from("warga").select("*")
let {data:kas}=await db.from("kas").select("*")

document.getElementById("statWarga").innerText=warga.length

let masuk=0
let keluar=0

kas.forEach(k=>{
masuk+=k.masuk||0
keluar+=k.keluar||0
})

let saldo=masuk-keluar

document.getElementById("statKas").innerText="Rp "+saldo

drawChart(masuk,keluar)

}



function drawChart(masuk,keluar){

new Chart(document.getElementById("chartKas"),{

type:"bar",

data:{
labels:["Kas Masuk","Kas Keluar"],
datasets:[{data:[masuk,keluar]}]
}

})

}
