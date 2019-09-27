
const BASE_URI = 'https://olgas-api-dev.herokuapp.com';

export async function getNews() {
    return fetch(BASE_URI + '/news', { mode: 'cors' })
        .then( res => res.json());
}

export async function newNews(newTitle, newSubTitle, newDetail) {
    return fetch(BASE_URI + '/news', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newTitle,
            subTitle: newSubTitle,
            detail: newDetail
        })
    }).then ( res => res.json() )
}


export async function deleteNews(ID_to_Delete) {
    return fetch('https://olgas-api-dev.herokuapp.com/news/deleteNewsItem', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: ID_to_Delete
            })
        }).then (res => res.json() )
}
