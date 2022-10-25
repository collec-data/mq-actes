import { ViewModel } from "src/app/models/acte.viewmodel"

export function annexes(): ViewModel.Annexe[] {
    return [
        { titre: 'Délibération du 19.11 dm 11', url: 'void' },
        { titre: 'Délibération du 20.11 dm 11', url: 'void' },
    ]
}

export function acte(): ViewModel.Acte {

    let _annexes = annexes()
    return {
        titre: 'Délibération du 19.11 décision modificative 11',
        date_acte: '19/11/2021',
        date_publication: '15/10/2022',

        objet: 'DELIB du 19.11 DM 11',
        type: 'Document budgétaires et financiers',
        classification: '7.1 Finances locales/Divers',
        siren: '253514491',

        annexes: _annexes,
    }
}

export function actes(): ViewModel.Acte[] {

    return [
        acte(),
        acte(),
        acte(),
        acte(),
        acte(),
    ]
}