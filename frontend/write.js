const form = document.getElementById("write-form")

const handleSubmitForm = async(event) => {
    // 세계 시간 기준으로
    event.preventDefault();
    const body = new FormData(form)
    body.append('insertAt', new Date().getTime())
    try {
        const res = await fetch('/items', {
            method:'POST',
            body,
        })
        
        const data = await res.json()
        if (res.status==='200'){
            window.location.pathname = "/"
        }
    }
    catch (e) {
        console.error(e)
    }
}

form.addEventListener('submit', handleSubmitForm)