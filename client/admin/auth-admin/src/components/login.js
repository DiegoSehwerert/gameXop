class LoginComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadowRoot.innerHTML = `
        <style>
          .box {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .login-container {
            padding: 16px;
            background-color: #f1f1f1;
            border-radius: 5px;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
            margin: 0 auto;
          }
          .login-container h2 {
            text-align: center;
            color: #333;
          }
          .login-container input {
            width: 100%;
            padding: 10px 0;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          .login-container button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            color: #fff;
            background-color: #007BFF;
          }
          .login-container button:hover {
            background-color: #0056b3;
          }
          .login-container a {
            display: block;
            text-align: center;
            margin-top: 10px;
            color: #007BFF;
            text-decoration: none;
          }
          .login-container a:hover {
            color: #0056b3;
          }
          .login-container span {
            display: block;
            text-align: center;
            padding-top: 30px;
            color: #333;
          }
        </style>
        <div class="box">
          <div class="login-container">
            <h2>Iniciar sesión</h2>
            <input type="text" placeholder="Usuario" required>
            <input type="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar sesión</button>
            <a href="/admin/login/reset">¿Has olvidado tu contraseña?</a>
            <span>¿No tienes cuenta?<a href="/admin/login/register"> Regístrate ahora</a></span>
          </div>
        </div>
      `
  }
}

customElements.define('login-component', LoginComponent)
