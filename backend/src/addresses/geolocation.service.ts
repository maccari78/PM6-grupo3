import { Injectable } from '@nestjs/common';
import fetch from 'cross-fetch';

@Injectable()
export class geolocationService {
  async getCordinates(address: string) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=jsonv2`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'proyectofinal.g3.henry@gmail.com',
          Referer: 'http://localhost',
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(
          'Error en la respuesta del servidor:',
          response.status,
          response.statusText,
        );
        console.error('Respuesta del servidor:', text);
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      if (data.length === 0) {
        console.warn('No se encontraron coordenadas con esa dirección');
        return { latitude: null, longitude: null };
      }

      const { lat, lon } = data[0];
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      };
    } catch (error) {
      console.error('No se encontraron coordenadas con esa dirección:', error);
    }
  }
}
