import { env } from './.env';

export const environment = {
  production: false,
  version: env['npm_package_version'] + '-dev',
  pokemonKey: env['pokemon_key'],
  serverUrl: 'https://api.pokemontcg.io/v2',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'pt-BR'],
};
