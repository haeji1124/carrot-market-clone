<form id="signup-form" action="/signup" method="post">
  <div>회원가입</div>
  <div>
    <label for="id">아이디</label>
    <input type="text" id="id" name="id" required />
  </div>
  <div>
    <label for="password">패스워드</label>
    <input type="password" name="password" id="password" required />
  </div>
  <div>
    <label for="password2">패스워드 확인</label>
    <input type="password" name="password2" id="password2" required />
  </div>
  <div>
    <label for="name">이름</label>
    <input type="text" id="name" name="name" required />
  </div>
  <div>
    <label for="email">이메일</label>
    <input type="email" id="email" name="email" required />
  </div>
  <div>
    <button type="submit">회원 가입하기</button>
  </div>
  <div id="info"></div>
</form>
