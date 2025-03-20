import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Material} from "../model/material";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterialRestService {

  private API_URL = "http://localhost:8080/materiais";

  constructor(private http: HttpClient) { }

    postarMaterial(material: Material): Observable<Material> {
      return this.http.post<Material>(this.API_URL, material);
    }

    atualizarMaterial(material: Material): Observable<Material> {
      return this.http.put<Material>(`${this.API_URL}/${material.id}`, material);
    }

    deletarMaterial(id: string | undefined): Observable<any> {
      console.log(id);
      return this.http.delete(`${this.API_URL}/${id}`);
    }

    getMateriais(): Observable<Material[]> {
      return this.http.get<Material[]>(this.API_URL);
    }

    getMaterialbyPublic(): Observable<Material[]> {
      return this.http.get<Material[]>(`${this.API_URL}/public`);
    }
    
    getMaterialbyPrivate(): Observable<Material[]> {
      return this.http.get<Material[]>(`${this.API_URL}/private`);
    }
  
  exibirMaterialPorId(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.API_URL}/${id}`);
  }

    readTaskByUser(userId: string): Observable<Material[]> {
      return this.http.get<Material[]>(`${this.API_URL}?userId=${userId}`);
    }
}
