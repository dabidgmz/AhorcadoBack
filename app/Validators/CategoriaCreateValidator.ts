import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriaCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({ table: 'categorias', column: 'name' }),
  ]),

  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    string: 'The {{ field }} must be a string.',
    number: 'The {{ field }} must be a number.',
    required: 'The {{ field }} is required.',
    exists: 'The {{ field }} does not exist. Please enter a valid value.',
    email: 'The {{ field }} must be a valid email address.',
    unique: 'The {{ field }} already exists. Please enter a different value.',
    minLength: 'The {{ field }} must be at least {{ options.minLength }} characters.',
    maxLength: 'The {{ field }} must be at most {{ options.maxLength }} characters.',
  }
}
