

console.log("Translating page via CDN...")


const URL2 = 'http://localhost:9000/history/create'

const translate2 = async (data) => {
    const body = JSON.stringify({english: data})
    console.log(body, body.length)
    return await fetch(URL2, {
        "method": 'POST',
        "headers": {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        "dataType": 'json',
        "body": body,
    })
}

const translate_content = async (text) => {
    const token = "5ff94268-1bfc-4cfd-94c0-3aeb51d6e001";
    const j = await translate2(text, token);
    const data = await j.json();
    current.text = data.hindi;
}



// 
// check if the given string is alpha
const checkAlpha = async (str) => {
    return str.match(/^[a-zA-Z]+$/i)
}


const scrape = async () => {
    const element = document.querySelector("html");
    let queue = [];
    queue.push(element)

    let cur;

    while (queue.length > 0) {
        cur = queue.shift();
        if (cur.children.length > 0) {
            for (let children of cur.children) {
                queue.push(children)
            }
        } else {
            if (
                (cur.tagName === 'PATH') || (cur.tagName === 'path') ||
                (cur.tagName === 'RECT') || (cur.tagName === 'rect') ||
                (cur.tagName === 'CIRCLE') || (cur.tagName === 'circle') ||
                (cur.tagName === 'IMG') || (cur.tagName === 'img') ||
                (cur.tagName === 'SCRIPT') || (cur.tagName === 'script') ||
                (cur.tagName === 'LINK') || (cur.tagName === 'link') ||
                (cur.tagName === 'STYLE') || (cur.tagName === 'style') ||
                (cur.tagName === 'META') || (cur.tagName === 'meta') ||
                (cur.tagName === 'NOSCRIPT') || (cur.tagName === 'noscript')
                // (cur.tagName === 'RECT') || (cur.tagName === 'rect')
            ) {
                continue;
            } 
            else if ((cur.tagName === "SPAN") || (cur.tagName === "span")) {
                // await checkAlpha(cur.innerText) 
                // ? console.log(cur.innerText) 
                // : console.log("Invalid data")
                // cur.innerText = "SPANS";

                const text = cur.innerText;

                if (text === "") continue
                const j = await translate2(text);
                const data = await j.json();
                cur.innerText = data.hindi;
                
            } 
            else if ((cur.tagName === "A") || (cur.tagName === "a")) {
                // await checkAlpha(cur.innerText) ? console.log(cur) : console.log("Invalid data")
                // cur.innerText = "LINKS";
                const text = cur.innerText;
                if (text === "") continue
                const j = await translate2(text);
                const data = await j.json();
                cur.innerText = data.hindi;
            } else {
                console.log(cur);
            }
        }
    }
}


scrape();