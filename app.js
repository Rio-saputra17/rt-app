const SUPABASE_URL = "https://ocjspifnqtlevnupqmye.supabase.co"

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9janNwaWZucXRsZXZudXBxbXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDk4MDgsImV4cCI6MjA4ODgyNTgwOH0.PbtGLNW1XuqU7N-tvbdW23To5XH9wG0LPF1mF-A9B8Q"

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
)


// ======================
// LOAD DATA WARGA
// ======================

async function loadWarga(){

let {data,error}=await supabase
.from("warga")
.select("*")
.order("alamat",{ascending:true})

if(error){

console.log(error)
return

}

let html=""

data.forEach(w=>{

html+=`
<tr>
<td>${w.nama || ""}</td>
<td>${w.alamat || ""}</td>
<td>${w.kontak || ""}</td>
</tr>
`

})

document.getElementById("dataWarga").innerHTML=html

}



// ======================
// TAMBAH WARGA
// ======================

async function tambahWarga(){

let nama=document.getElementById("nama").value
let alamat=document.getElementById("alamat").value
let kontak=document.getElementById("kontak").value

if(!nama){

alert("Nama harus diisi")
return

}

const {error}=await supabase
.from("warga")
.insert([
{
nama:nama,
alamat:alamat,
kontak:kontak
}
])

if(error){

alert("Gagal simpan")
console.log(error)

}else{

alert("Data warga tersimpan")

document.getElementById("nama").value=""
document.getElementById("alamat").value=""
document.getElementById("kontak").value=""

loadWarga()

}

}



// ======================
// LOAD DATA KAS
// ======================

async function loadKas(){

let {data,error}=await supabase
.from("kas")
.select("*")
.order("tanggal",{ascending:false})

if(error){

console.log(error)
return

}

let saldo=0
let html=""

data.forEach(k=>{

let masuk = k.masuk || 0
let keluar = k.keluar || 0

saldo += masuk - keluar

html+=`
<tr>
<td>${k.tanggal || ""}</td>
<td>${k.keterangan || ""}</td>
<td>${masuk}</td>
<td>${keluar}</td>
</tr>
`

})

document.getElementById("dataKas").innerHTML=html
document.getElementById("saldo").innerText=saldo

}
