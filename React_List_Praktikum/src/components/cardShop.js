import React from "react"

class Card extends React.Component{
    render(){
        return(
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={this.props.gambar} className="img"
                            height="200" />

            </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">
                        { this.props.barang }
                        </h5>
                        <p className="card-text">
                            Deskripsi : {this.props.deskripsi}
                        </p>
                        <p className="card-text">
                            Harga : Rp {this.props.harga}
                        </p>
                         {/* button untuk mengedit */}
                         <button className="btn btn-sm btn-primary m-1"
                            onClick={this.props.onEdit}>
                                Edit
                            </button>
 
                            {/* button untuk menghapus */}
                            <button className="btn btn-sm btn-danger m-1"
                            onClick={this.props.onDrop}>
                                Hapus
                            </button>
                             {/* button untuk menambah ke keranjang belanja */}
                             <button className="btn btn-sm btn-success m-1"
                            onClick={this.props.onCart}>
                                Tambahkan ke keranjang belanja
                            </button>


      </div>
    </div>
  </div>
</div>
        )
    }
}
export default Card;