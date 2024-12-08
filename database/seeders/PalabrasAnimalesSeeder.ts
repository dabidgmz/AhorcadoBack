import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Palabra from 'App/Models/Palabra'

export default class extends BaseSeeder {
  public async run() {
    await Palabra.createMany([
      {
        palabra: 'perro',
        descripcion: 'Un animal doméstico leal',
        categoriaId: 1,
      },
      {
        palabra: 'gato',
        descripcion: 'Un animal felino ágil',
        categoriaId: 1,
      },
      {
        palabra: 'elefante',
        descripcion: 'Un animal grande con trompa',
        categoriaId: 1,
      },
      {
        palabra: 'tiburon',
        descripcion: 'Un animal marino depredador',
        categoriaId: 1,
      },
      {
        palabra: 'leon',
        descripcion: 'El rey de la selva',
        categoriaId: 1,
      },
      {
        palabra: 'zorro',
        descripcion: 'Un animal astuto y veloz',
        categoriaId: 1,
      },
      {
        palabra: 'caballo',
        descripcion: 'Un animal fuerte usado para montar',
        categoriaId: 1,
      },
      {
        palabra: 'jirafa',
        descripcion: 'Un animal alto con un largo cuello',
        categoriaId: 1,
      },
      {
        palabra: 'panda',
        descripcion: 'Un oso blanco y negro que come bambú',
        categoriaId: 1,
      },
      {
        palabra: 'koala',
        descripcion: 'Un marsupial que vive en los árboles',
        categoriaId: 1,
      },
      {
        palabra: 'lobo',
        descripcion: 'Un animal salvaje similar a un perro',
        categoriaId: 1,
      },
      {
        palabra: 'canguro',
        descripcion: 'Un marsupial que salta alto',
        categoriaId: 1,
      },
      {
        palabra: 'aguila',
        descripcion: 'Un ave majestuosa y rapaz',
        categoriaId: 1,
      },
      {
        palabra: 'camaleon',
        descripcion: 'Un reptil que cambia de color',
        categoriaId: 1,
      },
      {
        palabra: 'pulpo',
        descripcion: 'Un animal marino con tentáculos',
        categoriaId: 1,
      },
      {
        palabra: 'flamenco',
        descripcion: 'Un ave de color rosado que vive cerca del agua',
        categoriaId: 1,
      },
      {
        palabra: 'mapache',
        descripcion: 'Un animal nocturno con máscara negra',
        categoriaId: 1,
      },
      {
        palabra: 'ballena',
        descripcion: 'El mamífero más grande del océano',
        categoriaId: 1,
      },
      {
        palabra: 'tortuga',
        descripcion: 'Un reptil con un caparazón protector',
        categoriaId: 1,
      }
    ])
  }
}
