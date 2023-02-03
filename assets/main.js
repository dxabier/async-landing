//const fetch = require('node-fetch');

const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCSMErcbTieSS4Q1CS7IXkFA&part=snippet%2Cid&order=date&maxResults=10';

const content = null || document.getElementById('content')

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'de13b64356msh3413f903b13e197p1ef5dcjsn7e94adb93947',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};
/*
fetch(url, options)
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.error('error:' + err));
*/

async function fetchData() {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(url);
        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700" style="color:white;">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>    
        `).slice(0,4).join('')}
            
        `;
        content.innerHTML = view;
    } catch (err) {
        console.log(err);
    }
})();