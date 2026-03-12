const { createClient } = supabase

const db=createClient(
"https://ocjspifnqtlevnupqmye.supabase.co",
"YOUR_SUPABASE_KEY"
)

let wargaData=[]

function login(role){

let pass=prompt("Password")

if(pass==="RTKU"){
startApp()
}else{
alert("Password salah")
}

}

function logout(){
location.reload()
}

function startApp(){

document.getElementById("loginPage").style.display="none"
document.getElementById("app").style.display="block"

loadDashboard()
loadWarga()
loadKas()
loadIuran()

}

function openPage(id){

document.querySelectorAll(".page").forEach(p=>p.classList.add("hide"))

if(id==="dashboard"){
document.getElementById("dashboard").classList.remove("hide")
}else{
document.getElementById(id).classList.remove("hide")
}

}

async function tambahWarga(){

let nama=document.getElementById("namaWarga").value
let alamat=document.getElementById("alamatWarga").value
let kontak=document.getElementById("kontakWarga").value

await db.from("warga").insert([{nama,alamat,kontak}])

loadWarga()

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

async function bayarIuran(){

let nama=document.getElementById("namaBayar").value
let bulan=document.getElementById("bulan").value
let jumlah=parseInt(document.getElementById("jumlahBayar").value)

await db.from("iuran").insert([{nama,bulan,jumlah}])

await db.from("kas").insert([{
keterangan:"Iuran "+nama+" "+bulan,
masuk:jumlah,
keluar:0
}])

loadIuran()
loadKas()

}

async function loadIuran(){

let {data}=await db.from("iuran").select("*")

let html=""

data.forEach(i=>{

html+=`
<tr>
<td>${i.nama}</td>
<td>${i.bulan}</td>
<td>${i.jumlah}</td>
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

let saldo=0

kas.forEach(k=>{
saldo+= (k.masuk||0)-(k.keluar||0)
})

document.getElementById("statKas").innerText="Rp "+saldo

}
