import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://ocmefpjbkckbnvobewre.supabase.co', // URL de tu proyecto en Supabase
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jbWVmcGpia2NrYm52b2Jld3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5OTY0MDgsImV4cCI6MjA0MzU3MjQwOH0.2Qss_OlRmMhF9Jgo57HpcRmSA0cvWMGti4oqlJFTnwE' // API key
    );
  }

  // Método para subir imagen
  async uploadImage(file: File): Promise<string | null> {
    try {
      const storedUser = sessionStorage.getItem('usuario');

      if (!storedUser) {
        console.error('Error: Usuario no autenticado. Verifica el sessionStorage.');
        return null;
      }

      const userId = JSON.parse(storedUser).email;

      const { data: uploadData, error: uploadError } = await this.supabase.storage
        .from('aircnc_images')
        .upload(`${userId}/${file.name}`, file);

      if (uploadError) {
        console.error('Error al subir la imagen:', uploadError.message);
        return null;
      }

      return uploadData?.path || null;
    } catch (error) {
      console.error('Error general al subir la imagen:', error);
      return null;
    }
  }

  // Método para obtener la URL pública de la imagen 
  async getImageUrl(path: string): Promise<string | null> {
    try {
      const { data } = this.supabase.storage
        .from('aircnc_images')  // Nombre del bucket
        .getPublicUrl(path);

      console.log('URL pública generada:', data.publicUrl);  // Imprimir la URL generada

      return data.publicUrl || null;
    } catch (error) {
      console.error('Error general al obtener la URL pública:', error);
      return null;
    }
  }
}
