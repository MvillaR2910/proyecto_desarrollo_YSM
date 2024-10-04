import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.apiKey
    );
  }

  // Método para subir imagen
  async uploadImage(file: File): Promise<string | null> {
    try {
      // Comprobar si el usuario está autenticado en el sessionStorage local
      const storedUser = sessionStorage.getItem('usuario');

      if (!storedUser) {
        console.error('Error: Usuario no autenticado. Verifica el sessionStorage.');
        return null;
      }

      const userId = JSON.parse(storedUser).email; // Puedes usar el email o cualquier identificador único del usuario.

      const { data: uploadData, error: uploadError } = await this.supabase.storage
        .from('aircnc_images')
        .upload(`${userId}/${file.name}`, file);  // Guardar la imagen en una carpeta del usuario

      if (uploadError) {
        console.error('Error al subir la imagen:', uploadError.message);
        return null;
      }

      return uploadData?.path || null;  // Devolver la ruta del archivo si está disponible
    } catch (error) {
      console.error('Error general al subir la imagen:', error);
      return null;
    }
  }

  // Método para obtener la URL pública de la imagen
  async getImageUrl(path: string): Promise<string | null> {
    try {
      const { data } = this.supabase.storage
        .from('aircnc_images')  // Usa el nombre correcto del bucket
        .getPublicUrl(path);

      return data?.publicUrl || null;  // Devolver la URL pública si está disponible
    } catch (error) {
      console.error('Error al obtener la URL pública:', error);
      return null;
    }
  }
}
