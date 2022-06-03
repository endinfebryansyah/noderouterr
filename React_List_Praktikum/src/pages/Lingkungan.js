import React, { Component } from "react";
import $ from "jquery";
import Card from "../components/cardLingkungan";
// import 'bootstrap/dist/css/bootstrap.min.css';
export default class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            event: [
                {
                    nama: "Hari Bumi", 
                    tanggal: "22-04-22",
                },
                {
                    nama: "Hari Lingkungan Hidup Sedunia",
                    tanggal : "05-06-22",
                }
               
            ],

            action: "",
            nama: "",
            tanggal: "",
            selectedItem: null,
        }
        this.state.filterEvent = this.state.event


    }

    setUser = () => {
        // cek eksistensi dari session storage
        if (sessionStorage.getItem("user") === null) {
            // kondisi jika session storage "user" belum dibuat
            let prompt = window.prompt("Masukkan Nama Anda", "")
            if (prompt === null || prompt === "") {
                // jika user tidak mengisikan namanya
                this.setUser()
            } else {
                // jika user telah mengisikan namanya
                // simpan nama user ke session storage
                sessionStorage.setItem("user", prompt)
                // simpan nama user ke state.user
                this.setState({ user: prompt })
            }
        } else {
            // kondisi saat session storage "user" telah dibuat
            // akses nilai dari session storage "user"
            let name = sessionStorage.getItem("user")
            this.setState({ user: name })
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

            nama: "",
            tanggal: "",
            action: "insert"
        })
    }

    Edit = (item) => {
        $("#modal").show()
        // menampilkan komponen modal
        // $("#modal").modal("show")
        this.setState({
            nama: item.nama,
            tanggal: item.tanggal,
            action: "update",
            selectedItem: item
        })
    }


    Save = (event) => {
        event.preventDefault();
        // menampung data state buku
        let tempEvent = this.state.event

        if (this.state.action === "insert") {
            // menambah data baru
            tempEvent.push({
                nama: this.state.nama,
                tanggal: this.state.tanggal,
            })
        } else if (this.state.action === "update") {
            // menyimpan perubahan data
            let index = tempEvent.indexOf(this.state.selectedItem)
            tempEvent[index].nama = this.state.nama
            tempEvent[index].tanggal = this.state.tanggal
            
        }

        this.setState({ event: tempEvent })

        // menutup komponen modal_buku
        $("#modal").hide()
    }

    Drop = (index) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // menghapus data
            let tempEvent = this.state.event
            // posisi index data yg akan dihapus
            // let index = tempEvent.indexOf(item)

            // hapus data
            tempEvent.splice(index, 1)

            this.setState({ event: tempEvent })
        }
    }

    Close = () =>{
        $("#modal").hide()
    }

    searching = event => {
        if (event.keyCode === 13) {
            // 13 adalah kode untuk tombol enter

            let keyword = this.state.keyword.toLowerCase()
            let tempEvent = this.state.event
            let result = tempEvent.filter(item => {
                return item.event.toLowerCase().includes(keyword) ||
                item.status.toLowerCase().includes(keyword)             })

            this.setState({ filterEvent: result })
        }
    }


    



    render() {
        return (
            <div className="container">
                <h4 className="text-primary my-2">
                    Nama Pengguna : {this.state.user}
                </h4>
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                    value={this.state.keyword}
                    onChange={ev => this.setState({ keyword: ev.target.value })}
                    onKeyUp={ev => this.searching(ev)}
                />
                <div className="row">
                    {this.state.filterEvent.map((item, index) => (
                        <Card
                            key={index}
                            nama={item.nama}
                            tanggal={item.tanggal}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                        />
                    ))}
                </div>
                    
                <button className="btn btn-success" onClick={() => this.Add()} data-toggle="modal" data-target="#modal">
                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title"><b>Form Event</b></h4>
                                <button type="button" class="btn-close" data-dismiss="modal" onClick={() => this.Close()}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Event
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({ nama: ev.target.value })}
                                        required />

                                    Tanggal Event
                                    <input type="date" className="form-control mb-2"
                                        value={this.state.tanggal}
                                        onChange={ev => this.setState({ tanggal: ev.target.value })}
                                        required />

                                    
                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}