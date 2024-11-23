const calcTitme = (timestamp) => {
    // 한국 시간 UTC + 9
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const min = time.getMinutes()
    const sec = time.getSeconds()

    if (hour > 0) return `${hour}시간 전`
    else if (min > 0) return `${min}분 전`
    else if (sec > 0) return `${sec}초 전`
    else return `방금 전`
}

const renderDate = (data) => {
    console.log(data)
    const main = document.querySelector('main');
    data.reverse().forEach(async(obj) => {
        const itemListDiv = document.createElement("div");
        itemListDiv.className = "item-list"
        
        const itemListImgDiv = document.createElement("div");
        itemListImgDiv.className = "item-list__img"
        
        const img = document.createElement("img")
        const res = await fetch(`/images/${obj.id}`)
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        img.src = url
        img.alt = "image"
        
        const itemListInfoDiv = document.createElement("div");
        itemListInfoDiv.className = "item-list__info"
        
        const itemListInfoTitleDiv = document.createElement("div");
        itemListInfoTitleDiv.className = "item-list__info-title"
        itemListInfoTitleDiv.innerText = obj.title
        
        const itemListInfoMetaDiv = document.createElement("div");
        itemListInfoMetaDiv.className = "item-list__info-meta"
        itemListInfoMetaDiv.innerText = obj.place +' '+ calcTitme(obj.insertAt)
        
        const itemListInfoPriceDiv = document.createElement("div");
        itemListInfoPriceDiv.className = "item-list__info-price"
        itemListInfoPriceDiv.innerText = obj.price

        const div = document.createElement("div");
        div.innerText = obj.title;
        main.appendChild(itemListDiv);
        itemListDiv.appendChild(itemListImgDiv)
        itemListImgDiv.appendChild(img)
        itemListDiv.appendChild(itemListInfoDiv)
        itemListInfoDiv.appendChild(itemListInfoTitleDiv)
        itemListInfoDiv.appendChild(itemListInfoMetaDiv)
        itemListInfoDiv.appendChild(itemListInfoPriceDiv)

    })
}

const fetchList = async() => {
    const access_token = window.localStorage.getItem("access_token")
    const res = await fetch('/items', {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${access_token}`
        }
    })
    if (res.status === 401){
        alert("로그인이 필요합니다!")
        window.location.pathname = "/login.html"
        return
    }
    const data = await res.json();
    renderDate(data);
}

fetchList();