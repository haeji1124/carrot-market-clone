const renderDate = (data) => {
    console.log(data)
    const main = document.querySelector('main');
    data.forEach((obj) => {
        const div = document.createElement("div");
        div.innerText = obj.title;
        main.appendChild(div);
    })
}

const fetchList = async() => {
    const res = await fetch('/items', {
        method: 'GET'
    })
    const data = await res.json();
    renderDate(data);
}

fetchList();