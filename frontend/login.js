const form = document.querySelector("#login-form")

let accessToken = null;

const checkPassword = (formData) => {
    const password1 = formData.get("password")
    const password2 = formData.get("password2")

    return password1 === password2
}

const handleSubmitForm = async(event) => {
    event.preventDefault();
    const formData = new FormData(form)
    const sha256passowd1 = sha256(formData.get('password'))
    formData.set('password', sha256passowd1) //name값
    
    const res = await fetch('/login', {
        method:'POST',
        body:formData,
    })
    const data = await res.json()
    accessToken = data.access_token;

    // localStorage에 토큰 저장
    window.localStorage.setItem('access_token', accessToken);
    alert("로그인 되었습니다.")
    // const infoDiv = document.querySelector("#info")
    // infoDiv.innerText = "로그인 되었습니다!!"

    window.location.pathname = "/"

    // const btn = document.createElement("button")
    // btn.innerText = "상품가져오기"

    // btn.addEventListener("click", async() => {
    //     const token = localStorage.getItem('access_token');
    //     console.log(token)
    //     try {
    //         const res = await fetch("/items", {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: 'include'
    //         });
            
    //         if (!res.ok) {
    //             throw new Error(`HTTP error! status: ${res.status}`);
    //         }
            
    //         const data = await res.json();
    //         console.log('Retrieved items:', data);
    //     } catch (error) {
    //         console.error('Error fetching items:', error);
    //     }
    // })

    // infoDiv.appendChild(btn);
}

form.addEventListener('submit', handleSubmitForm)