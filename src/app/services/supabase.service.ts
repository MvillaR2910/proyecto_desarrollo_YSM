import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://ocmefpjbkckbnvobewre.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jbWVmcGpia2NrYm52b2Jld3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5OTY0MDgsImV4cCI6MjA0MzU3MjQwOH0.2Qss_OlRmMhF9Jgo57HpcRmSA0cvWMGti4oqlJFTnwE'
    );
  }

  // Método para subir imagen en una carpeta específica del usuario
  async uploadImage(file: File): Promise<string | null> {
    try {
      // Obtener el usuario autenticado desde sessionStorage
      const storedUser = sessionStorage.getItem('usuario');
      if (!storedUser) {
        console.error('Error: Usuario no autenticado.');
        return null;
      }

      const userId = JSON.parse(storedUser).email;  // Usar el email o cualquier identificador único del usuario

      // Subir la imagen a una carpeta específica del usuario
      const { data: uploadData, error: uploadError } = await this.supabase.storage
        .from('aircnc_images')
        .upload(`${userId}/${file.name}`, file);  // Guardar la imagen en una carpeta del usuario

      if (uploadError) {
        console.error('Error al subir la imagen:', uploadError.message);
        return null;
      }

      // Imprimir en consola que la imagen fue subida exitosamente
      console.log(`Imagen subida correctamente a: ${uploadData?.path}`);

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
        .from('aircnc_images')
        .getPublicUrl(path);

      return data?.publicUrl || null;
    } catch (error) {
      console.error('Error al obtener la URL pública:', error);
      return null;
    }
  }
}
