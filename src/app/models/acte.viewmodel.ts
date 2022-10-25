export namespace ViewModel {
    export interface Acte {
        titre: string
        date_acte: string
        date_publication: string

        objet: string
        type: string
        classification: string
        siren: string

        annexes: Annexe[]
    }

    export interface Annexe {
        titre: string
        url: string
    }
}