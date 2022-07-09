export type addressType = {
    network: string,
    address: string
}

export type documentType = {
    id: string,
    ticker: string,
    addresses: addressType[]
}

export type resdocType = {
    data: documentType,
    imgurl: string
}