const { createClient } = supabase

const db = createClient(
"https://ocjspifnqtlevnupqmye.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9janNwaWZucXRsZXZudXBxbXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDk4MDgsImV4cCI6MjA4ODgyNTgwOH0.PbtGLNW1XuqU7N-tvbdW23To5XH9wG0LPF1mF-A9B8Q"
)


// ======================
// LOAD WARGA
// ======================

async function loadWarga(){

let {data}=await db
.from("warga")
.select("*")
.order("alamat",{ascending:true})

let html=""

data.forEach(w=>{

html+=`

<tr>
<td>${w.nama}</td>
<td>${w.alamat}</td>
<td>${w.kontak}</td>
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

await db.from("warga").insert([{nama,alamat,kontak}])

alert("Data warga tersimpan")

loadWarga()

}



// ======================
// INPUT PEMBAYARAN IURAN
// ======================

async function bayarIuran(){

let nama=document.getElementById("namaBayar").value
let bulan=document.getElementById("bulan").value
let jumlah=document.getElementById("jumlah").value

let today=new Date().toISOString().split("T")[0]
let tahun=new Date().getFullYear()

await db.from("iuran").insert([

{
nama:nama,
bulan:bulan,
tahun:tahun,
status:"Lunas",
tanggal_bayar:today,
jumlah:jumlah
}

])


// otomatis masuk kas

await db.from("kas").insert([

{
tanggal:today,
keterangan:"Iuran "+nama+" "+bulan,
masuk:jumlah,
keluar:0
}

])

alert("Pembayaran berhasil")

}
