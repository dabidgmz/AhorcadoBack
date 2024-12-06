import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PalabraCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    palabra: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({ table: 'palabras', column: 'palabra' }),  // Asegúrate de usar 'palabra'
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.maxLength(255),
    ]),
    categoria_id: schema.number([
      rules.exists({ table: 'categorias', column: 'id' }),  // Verifica que categoria_id exista
    ]),
  });

  public messages: CustomMessages = {
    'palabra.required': 'La palabra es obligatoria.',
    'palabra.minLength': 'La palabra debe tener al menos 3 caracteres.',
    'palabra.maxLength': 'La palabra no puede exceder 255 caracteres.',
    'palabra.unique': 'La palabra ya existe, elige una diferente.',
    'descripcion.maxLength': 'La descripción no puede exceder 255 caracteres.',
    'categoria_id.exists': 'La categoría seleccionada no existe.',
    'categoria_id.required': 'La categoría es obligatoria.',
  };
}
