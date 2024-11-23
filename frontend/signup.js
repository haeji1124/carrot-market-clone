const form = document.querySelector("#signup-form")

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
    console.log(formData.get('password'))
    
    const sha256passowd2 = sha256(formData.get('password2'))
    formData.set('password2', sha256passowd2) //name값
    console.log(formData.get('password2'))

    const div = document.querySelector("#info")

    if (checkPassword(formData)){
        const res = await fetch('/signup', {
            method:'POST',
            body:formData,
        })
        const data = await res.json()
        if (data === "200"){
            alert("회원가입에 성공했습니다")
            window.location.pathname = "/login.html"
        }
    }else{
        div.innerText = "비밀번호가 같지 않습니다"
        div.style.color = "red"
    }
    
}

form.addEventListener('submit', handleSubmitForm)