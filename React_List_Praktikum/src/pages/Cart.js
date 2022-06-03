import React from "react"
import $ from "jquery";
import Card from "../components/cardShop"

class Produk extends React.Component{
    
    constructor(){
        super()
        this.state = {
            cart: [
                {
                    kode : "1234", barang:"Pensil", deskripsi:"ini pensil 2A", harga: 3000,
                    gambar:"https://i.pinimg.com/564x/bf/b1/11/bfb11136a3d1e380bcf41a76bfa9a376.jpg"
                },
                {
                    kode : "1235", barang:"Buku", deskripsi:"buku tulis 58 lembar", harga: 6000,
                    gambar:"https://i.pinimg.com/564x/ec/54/b7/ec54b77da9d4c5d0aff7e63df6fbd6dd.jpg"
                }
            ],

            action: "",
            kode:"",
            barang: "",
            deskripsi: "",
            harga:"",
            gambar:"",
            selectedItem: null,
        }
        this.state.filterCart = this.state.cart


    }
setUser = () => {
    // cek eksistensi dari session storage
    if(sessionStorage.getItem("user") === null){
        // kondisi jika session storage "user" belum dibuat
        let prompt = window.prompt("Masukkan Nama Anda","")
        if(prompt === null || prompt === ""){
            // jika user tidak mengisikan namanya
            this.setUser()
        }else{
            // jika user telah mengisikan namanya

            // simpan nama user ke session storage
            sessionStorage.setItem("user", prompt)

            // simpan nama user ke state.user
            this.setState({user: prompt})
        }
    }else{
        // kondisi saat session storage "user" telah dibuat

        // akses nilai dari session storage "user"
        let nama = sessionStorage.getItem("user")
        this.setState({user: nama})
    }
}
componentDidMount() {
    this.setUser()
}
Add = () => {
    $("#modal").show()
    // menampilkan komponen modal
    // $("#modal").modal("show")
    this.setState({
        
        kode:Math.random(1,10000000),
        barang:"",
        deskripsi:"",
        harga:"",
        gambar:"",
        action:"insert"
    })
}



Edit = (item) => {
    $("#modal").show()
    // menampilkan komponen modal
    // $("#modal").modal("show")
    this.setState({
       kode:item.kode,
       barang:item.barang,
       deskripsi:item.deskripsi,
       harga:item.harga,
       gambar:item.gambar,
       action:"update",
       selectedItem:item
    })
}


Save = (cart) => {
    cart.preventDefault();
    // menampung data state buku
    let tempCart = this.state.cart

    if (this.state.action === "insert") {
        // menambah data baru
        tempCart.push({
            kode:this.state.kode,
           barang:this.state.barang,
           deskripsi:this.state.deskripsi,
           harga:this.state.harga,
           gambar:this.state.gambar,
        })
    } else if (this.state.action === "update") {
        // menyimpan perubahan data
        let index = tempCart.indexOf(this.state.selectedItem)
        tempCart[index].kode = this.state.kode
        tempCart[index].barang = this.state.barang
        tempCart[index].deskripsi = this.state.deskripsi
        tempCart[index].harga = this.state.harga
        tempCart[index].gambar = this.state.gambar

        
    }

    this.setState({ cart : tempCart })

    // menutup komponen modal_buku
    $("#modal").hide()
}

Drop = (index) => {
    // beri konfirmasi untuk menghapus data
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // menghapus data
        let tempCart= this.state.cart
        // posisi index data yg akan dihapus
        // let index = tempEvent.indexOf(item)

        // hapus data
        tempCart.splice(index, 1)

        this.setState({ cart : tempCart })
    }
}

Close = () =>{
    $("#modal").hide()
}

searching = cart => {
    if (cart.keyCode === 13) {
        // 13 adalah kode untuk tombol enter

        let keyword = this.state.keyword.toLowerCase()
        let tempCart = this.state.cart
        let result = tempCart.filter(item => {
            return item.cart.toLowerCase().includes(keyword) ||
            item.status.toLowerCase().includes(keyword)             })

        this.setState({ filterCart: result })
    }
}
addToCart = (selectedItem) => {
    // membuat sebuah variabel untuk menampung cart sementara
    let tempCart = []

    // cek eksistensi dari data cart pada localStorage
    if(localStorage.getItem("cart") !== null){
        tempCart = JSON.parse(localStorage.getItem("cart"))
        // JSON.parse() digunakan untuk mengonversi dari string -> array object
    }

    // cek data yang dipilih user ke keranjang belanja
    let existItem = tempCart.find(item => item.kode === selectedItem.kode)

    if(existItem){
        // jika item yang dipilih ada pada keranjang belanja
        window.alert("Anda telah memilih item ini")
    }else{
        // user diminta memasukkan jumlah item yang dibeli
        let promptJumlah = window.prompt("Masukkan jumlah item yang beli","")
        if(promptJumlah !== null && promptJumlah !== ""){
            // jika user memasukkan jumlah item yg dibeli

            // menambahkan properti "jumlahBeli" pada item yang dipilih
            selectedItem.jumlahBeli = promptJumlah
            
            // masukkan item yg dipilih ke dalam cart
            tempCart.push(selectedItem)

            // simpan array tempCart ke localStorage
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
    }
}

    render(){
        return(
            
        <div className="container">
                <h4 className="text-info my-2">
                    Nama Pengguna: { this.state.user }
                </h4>
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                value={this.state.keyword}
                onChange={ev => this.setState({keyword: ev.target.value})}
                onKeyUp={ev => this.searching(ev)}
                 />
                <div className="row">
                    {this.state.cart.map( (item, index) => (
                        <Card
                        key={index}
                        barang={item.barang}
                        deskripsi={item.deskripsi}
                        harga={item.harga}
                        gambar={item.gambar}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                        onCart={ () => this.addToCart(item)} 
                        />
                    )) }
                </div>
 
                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah barang
                </button>
 
                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Barang
                            </div>
 
                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Barang
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.barang}
                                    onChange={ ev => this.setState({barang: ev.target.value}) }
                                    required />
                                    
                                    Deskripsi
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.deskripsi}
                                    onChange={ ev => this.setState({deskripsi: ev.target.value}) }
                                    required />
                                    
                                    Harga Barang
                                    <input type="number" className="form-control mb-2"
                                    value={this.state.harga}
                                    onChange={ ev => this.setState({harga: ev.target.value}) }
                                    required />
                                    
                                    Cover Barang
                                    <input type="url" className="form-control mb-2"
                                    value={this.state.gambar}
                                    onChange={ ev => this.setState({gambar: ev.target.value}) }
                                    required />
 
                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        


        )
    }

}
export default Produk;
