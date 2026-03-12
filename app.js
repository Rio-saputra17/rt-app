const { createClient } = supabase

const db = createClient(
"https://ocjspifnqtlevnupqmye.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9janNwaWZucXRsZXZudXBxbXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDk4MDgsImV4cCI6MjA4ODgyNTgwOH0.PbtGLNW1XuqU7N-tvbdW23To5XH9wG0LPF1mF-A9B8Q"
)



// =====================
// LOAD DATA WARGA
// =====================

async function loadWarga(){

let {data,error}=await db
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

<td>${w.nama||""}</td>
<td>${w.alamat||""}</td>
<td>${w.kontak||""}</td>

</tr>

`

})

document.getElementById("dataWarga").innerHTML=html

}



// =====================
// TAMBAH WARGA
// =====================

async function tambahWarga(){

let nama=document.getElementById("nama").value
let alamat=document.getElementById("alamat").value
let kontak=document.getElementById("kontak").value

let {error}=await db
.from("warga")
.insert([{nama,alamat,kontak}])

if(error){

alert("gagal simpan")
console.log(error)

}else{

alert("data tersimpan")

loadWarga()

}

}
