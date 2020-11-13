export interface GoogleApiResult {
    context: GoogleApiContext,
    items: GoogleApiItem[]
}

export interface GoogleApiContext {
    title: string
}

export interface GoogleApiItem {
    title: string,
    htmlTitle: string,
    link: string,
    displayLink: string,
    snippet: string,
    htmlSnippet: string,
    pagemap: GoogleApiPicture
}

export interface GoogleApiPicture {
    cse_thumbnail: GoogleApiThumbnail
}

export interface GoogleApiThumbnail {
    src: string,
    width: string,
    height: string
}
