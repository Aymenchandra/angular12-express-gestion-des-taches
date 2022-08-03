import { Component, Inject, OnInit } from '@angular/core';
import { tache } from 'src/app/models/tache';
import { TacheService } from 'src/app/service/tache.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { CompteService } from 'src/app/service/compte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {

  role : string = this.token.getUser().roles[0];
  id : string = this.token.getUser().id;
  taches:tache[] = [];
  tachesbyatelier:tache[] = [];
  showAdminBoard = true;

  constructor(
    private tacheservice : TacheService,
    private token: TokenStorageService,
    private compte : CompteService,
    ) { 
      
    }

  ngOnInit(): void {
    this.getTaches()
    this.getTachebyatelier()
  }

  getTaches()
  {
    this.tacheservice.getAlltache().subscribe((tache)=>(this.taches = tache));
  }
  getTachebyatelier()
  {
    this.tacheservice.getTachebyAtlier(this.token.getUser().atelier).subscribe((tache)=>(this.tachesbyatelier = tache));
  }

  deletetache(i:number)
  {
    this.confirmDelete(i)
  }

  handleUpload(e:any):void{
    let fullpath = e.target.files;
    // console.log(fullpath[0].name)
    this.tacheservice.exportToDB(fullpath[0].name).subscribe();  
    
    let timerInterval = 1000
    Swal.fire({
      title: 'Alerte de fermeture automatique!',
      html: 'Actualiser les données<b></b> en milliseconds.',
      timer: 10000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer()!.querySelector('b')
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        this.getTaches()
      }
    })
  }


  downloadPDF(){
    let doc = new jsPDF();
    autoTable(doc,{html:"#planning"});
    doc.save("planning");
  }

  confirmedtache(tache:tache){
    this.ShowConfirmTache(tache)
  }

  updateStatusCompte(id:any,data:any){
    this.compte.updateCompte(id,data).subscribe(()=>{
      console.log("update successfully")
    })
  }
  getbyid(id:any,p:any){
    this.compte.getbyId(id).subscribe((res)=>{
      let prod = res.produits
      this.updateStatusCompte(id,{"produits": Number(prod) + p})
    })
  }
  confirmtache(i:number){

    let today = new Date();
    let planifie = new Date(this.tachesbyatelier[i].date_planifiee);
    let daterealise : any
    let d : any 
    let m : any 
    if(today.getMonth()<9)
    { 
      m = "0"+(today.getMonth()+1)
    }
    if(today.getMonth()>=9)
    { 
      m = today.getMonth()+1
    }
    if(today.getDate()<10)
    {
      d = "0"+today.getDate()
    }
    if(today.getDate()>10)
    {
      d = today.getDate()
    }
    daterealise = today.getFullYear()+"-"+m+"-"+d;
    // anticipe by year
    if(planifie.getFullYear() > today.getFullYear())
    {
      this.tachesbyatelier[i].anticipe = 1;
      this.tachesbyatelier[i].type = "termine";
      this.tachesbyatelier[i].date_realise = daterealise;
      this.confirmedtache(this.tachesbyatelier[i])
      this.getbyid(this.id,this.tachesbyatelier[i].produit)
      return
    }
    // retard by year
    if(planifie.getFullYear() < today.getFullYear())
    {
      this.tachesbyatelier[i].retard = 1;
      this.tachesbyatelier[i].type = "termine";
      this.tachesbyatelier[i].date_realise = daterealise;
      this.confirmedtache(this.tachesbyatelier[i])
      this.getbyid(this.id,this.tachesbyatelier[i].produit)
      return 
    }
    // same year
    if(planifie.getFullYear() == today.getFullYear())
    {
      // anticipe by month
      if(planifie.getMonth() > today.getMonth())
      {
        this.tachesbyatelier[i].anticipe = 1;
        this.tachesbyatelier[i].type = "termine";
        this.tachesbyatelier[i].date_realise = daterealise;
        this.confirmedtache(this.tachesbyatelier[i])
        this.getbyid(this.id,this.tachesbyatelier[i].produit)
        return 
      }
      // retard by month
      if(planifie.getMonth() < today.getMonth())
      {
        this.tachesbyatelier[i].retard = 1;
        this.tachesbyatelier[i].type = "termine";
        this.tachesbyatelier[i].date_realise = daterealise;
        this.confirmedtache(this.tachesbyatelier[i])
        this.getbyid(this.id,this.tachesbyatelier[i].produit)
        return 
      }
      //same month
      if(planifie.getMonth() == today.getMonth())
      {
        //same day
        if(planifie.getDate() == today.getDate())
        {
          this.tachesbyatelier[i].realise = 1;
          this.tachesbyatelier[i].type = "termine";
          this.tachesbyatelier[i].date_realise = daterealise;
          this.confirmedtache(this.tachesbyatelier[i])
          this.getbyid(this.id,this.tachesbyatelier[i].produit)
          return
        }
        //anticipe by day
        if(planifie.getDate() > today.getDate())
        {
          this.tachesbyatelier[i].anticipe = 1;
          this.tachesbyatelier[i].type = "termine";
          this.tachesbyatelier[i].date_realise = daterealise;
          this.confirmedtache(this.tachesbyatelier[i])
          this.getbyid(this.id,this.tachesbyatelier[i].produit)
          return
        }
        // retard by day
        if(planifie.getDate() < today.getDate())
        {
          this.tachesbyatelier[i].retard = 1;
          this.tachesbyatelier[i].type = "termine";
          this.tachesbyatelier[i].date_realise = daterealise;
          this.confirmedtache(this.tachesbyatelier[i])
          this.getbyid(this.id,this.tachesbyatelier[i].produit)
          return
        }
      }
    }
  }

  confirmDelete(i:any){
    Swal.fire({
      title: 'Vous êtes sûr de vouloir supprimer?',
      text: 'Vous ne serez pas en mesure de récupérer ces données!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, gardez-le.'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Supprimé!',
          'Ces données ont été supprimées.',
          'success'
        )
        this.tacheservice.deleteTache(this.taches[i]._id).subscribe(()=>this.getTaches());
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Ces données est en sécurité :)',
          'error'
        )
      }
    })
  }
  ShowConfirmTache(data:tache){
    Swal.fire({
      title: 'Vous êtes sûr de vouloir confirmer?',
      text: 'Vous ne serez pas en mesure de récupérer ces données!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, confirmer-le !',
      cancelButtonText: 'Non, gardez-le.'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Confirmer!',
          'Ces données ont été confirméés.',
          'success'
        )
        this.tacheservice.confirmTache(data).subscribe((res)=>{
          this.getTachebyatelier();
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Ces données est en tâche :)',
          'error'
        )
      }
    })
  }
  
}
