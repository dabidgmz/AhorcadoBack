import { schema, CustomMessages ,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserCreateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({ trim: true }, [
        rules.minLength(3),
        rules.maxLength(255),
    ]),
    username: schema.string({ trim: true }, [
        rules.unique({ table: 'users', column: 'username' }),
    ]),
    email: schema.string({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
    ]),

    password: schema.string({}, [
        rules.minLength(6),
        rules.maxLength(180),
    ]),


});

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
