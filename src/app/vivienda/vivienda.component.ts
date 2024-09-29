import { Component } from '@angular/core';
import { FooterComponent } from "../layout/footer/footer.component";
import { HeaderComponent } from "../layout/header/header.component";

@Component({
  selector: 'app-vivienda',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './vivienda.component.html',
  styleUrl: './vivienda.component.css'
})
export class ViviendaComponent {

  obetenerViviendas(){

    return [{
      direccion:"sasda",
      ciudad:"París",
      pais:"Francia",
      imgUrl: "../images/paris.jpeg",
      precioNoche: "641"

    },{
      direccion:"sasda",
      ciudad:"Tokyo",
      pais:"Japón",
      imgUrl: "../images/tokyo.jpeg",
      precioNoche: "521"

    },{
      direccion:"sasda",
      ciudad:"New York",
      pais:"Estados Unidos",
      imgUrl: "../images/york.jpeg",
      precioNoche: "213"

    },{
      direccion:"Casa en la montaña",
      ciudad:"Pig City",
      pais:"La Marranera",
      imgUrl: "../images/montain.jpeg",
      precioNoche: "120"
    }]

  }
}
