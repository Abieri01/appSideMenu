import { Component, OnInit } from '@angular/core';
import { getStorage, ref, listAll, Storage, getDownloadURL } from '@angular/fire/storage';
import { collection, getDocs, doc, Firestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
produto:any = [{
  nome:'',
  descricao:'',
  preco:'',
  qtd:'',
  image:''
}]
  constructor(private storage:Storage, private firestore:Firestore) { }

  ngOnInit() {
    this.listarBanco()
  }
  async listarBanco(){
    const querysnapshot = await getDocs(collection(this.firestore, 'Produtos'));
    querysnapshot.forEach((doc) => {
      console.log(`$(doc.id) => ${doc.data()['nome']}`);
      this.produto = [...this.produto, {nome: doc.data()['nome'], descricao: doc.data()['descricao'], preco: doc.data()['preco'], qtd: doc.data()['qtd'], image: doc.data()['image']}]
    });
  }
}
