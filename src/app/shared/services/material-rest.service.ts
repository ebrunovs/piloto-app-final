import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Material} from "../modelo/material";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterialRestService {

  private apiUrl = "http://localhost:3000/materiais";

  constructor(private http: HttpClient) { }

  postarMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  exibirMateriais(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }

  deletarMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  

}
