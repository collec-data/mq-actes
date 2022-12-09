export class EnvService {

  public backend_url: string = 'http://localhost:4200'
  public apropos_url?: string

  public env_file_loaded: boolean = false

  constructor() { }
}
