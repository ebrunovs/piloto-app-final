import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Material} from "../model/material";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterialRestService {

  private API_URL = "http://localhost:3000/materiais";

  constructor(private http: HttpClient) { }

  postarMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(this.API_URL, material);
  }

  exibirMateriais(): Observable<Material[]> {
    return this.http.get<Material[]>(this.API_URL);
  }

  deletarMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}
