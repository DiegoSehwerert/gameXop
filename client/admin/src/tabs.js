class Tabs extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`<style>
            * {
            margin: 0;
            padding: 0;
            }

            button {
            background: transparent;
            border: none;
            cursor: pointer;
            }

            a {
            text-decoration: none;
            }

            ul {
            list-style: none;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
            color: hsl(0, 0%, 100%);
            font-family: 'Roboto', sans-serif;
            }

            input,
            label,
            select,
            textarea,
            li,
            span,
            p {
            color: hsl(0, 0%, 100%);
            font-family: 'Roboto', sans-serif;
            }
            .form {
                flex: 2;
              }
              
              .form-buttons {
                background-color: hsl(0, 0%, 100%);
                display: flex;
                justify-content:space-between;
                margin-bottom: 1rem;
                padding-right: 0.5rem;
              }
              .tabs{
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;
              }
              .tabs button{
                height: 2.2rem; 
                padding: 0 2rem; 
              }
              
              .tab.active{
                background-color: rgb(41, 182, 182);
              }
              
              .tab button p{
                color: hsl(183.09, 97.77%, 35.1%);
              }
              .tab.active button p{
                color: white;
              }
              .form-savedelete-data{
                display: flex;
                gap: 0.5rem;
              }
              
              
              .form-clean-button button svg,
              .form-save-button button svg {
                width: 2rem;
              }
              
              .form-clean-button button svg path,
              .form-save-button button svg path {
                fill: hsl(207, 85%, 69%);
              }
              
              .form-clean-button button:hover svg path,
              .form-save-button button:hover svg path {
                fill: hsl(34, 79%, 53%);
              }
              .form-save-button-notification{
                display:none
              }
              .form-save-button-notification .active {
              position: absolute;
              }

              .notification {
              position: absolute;
              bottom: 10px;
              right: 10px;
              padding: 10px;
              background-color: #fff;
              border-radius: 5px;
              animation: fadeInOut 2s ease-in-out;
              }
              .notification-content-span span{
                color: #000;
              }

              .tab-content {
                display: none;
              }
              .tab-content .active{
                display: flex;
              }
              .active {
                display: flex;
                flex: 1;
                flex-direction: column;
                gap: 0.5rem;
              }
              
              .form-row {
                display: flex;
                gap: 2rem;
              }
              
              .form-element {
                display: flex;
                flex: 1;
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 1rem;
              }
              
              .form-element-label label {
                font-weight: 700;
              }
              
              .form-element-input * {
                background-color: hsl(226, 64%, 66%);
                border: none;
                box-sizing: border-box;
                font-size: 1rem;
                height: 2rem;
                outline: transparent;
                padding: 0.5rem;
                width: 100%;
              }
              .validate.active{
                border-bottom: 2px solid #d74242;
              }
              
              .form-element-input input[type="number"]::-webkit-outer-spin-button,
              .form-element-input input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              
              .form-element-input input[type="date"]::-webkit-calendar-picker-indicator,
              .form-element-input input[type="time"]::-webkit-calendar-picker-indicator {
                filter: invert(1);
              }
              
              .form-element-input textarea {
                height: 20vh;
                resize: none;
              }
        </style>
            <section class="form">
            <div class="form-buttons">
            <div class="tabs">
                <div class="tab active" data-form="main">
                <button>
                    <p>General</p>
                </button>
                </div>
                <div class="tab" data-form="avatar">
                <button>
                    <p>Imagenes</p>
                </button>
                </div>
            </div>
            
            <div class= "form-save-button-notification">
              <div class= "notification">
                <div class= "notification-content">
                  <div class= "notification-content-span">
                    <span>Muy Buena crack lo has guardado eres una bestia mi loko<span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-savedelete-data">
              <div class="form-clean-button">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>broom</title>
                    <path
                        d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" />
                    </svg>
                </button>
                </div>
                <div class="form-save-button">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>content-save</title>
                    <path
                        d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                    </svg>
                </button>
                </div>
              </div>
            </div>

            <form>
            <div class="tab-content active" data-form="main">
                <div class="form-row">
                <div class="form-element">
                    <div class="form-element-label">
                    <label for="name">
                        Nombre
                    </label>
                    </div>
                    <div class="form-element-input">
                    <input type="text" class=".validate" data-onlyletters="true">
                    </div>
                </div>
                <div class="form-element">
                    <div class="form-element-label">
                    <label for="email">
                        Email
                    </label>
                    </div>
                    <div class="form-element-input">
                    <input type="email">
                    </div>
                </div>
                </div>
                <div class="form-row">
                <div class="form-element">
                    <div class="form-element-label">
                      <label for="password">
                          Contraseña
                      </label>
                    </div>
                    <div class="form-element-input">
                      <input type="password" class="validate" data-minlength="8">
                    </div>
                </div>
                <div class="form-element">
                    <div class="form-element-label">
                      <label for="confirmar-password">
                          Repetir contraseña
                      </label>
                    </div>
                    <div class="form-element-input">
                      <input type="password">
                    </div>
                </div>
                    <div class="tabs">
                      <div class="tab active" data-form="main">
                        <button>
                            <p>General</p>
                        </button>
                      </div>
                      <div class="tab" data-form="avatar">
                        <button>
                            <p>Imagenes</p>
                        </button>
                      </div>
                    </div>
                </div>



            </div>
            <div class="tab-content" data-form="avatar">
                <div class="form-row">
                <div class="form-element">
                    <div class="form-element-label">
                    <label for="avatar">
                        Avatar
                    </label>
                    </div>
                    <div class="form-element-input">
                    <input type="file">
                    </div>
                </div>
                </div>
                </div>
            </div>
            </form>
        </section>
      `

    const allTabs = this.shadow.querySelector('.tabs')
    const tabContents = this.shadow.querySelectorAll('.tab-content')
    const form = this.shadow.querySelector('.form')
    const deleteButton = this.shadow.querySelector('form-save-button')

    allTabs.addEventListener('click', (event) => {
      if (event.target.closest('.tab')) {
        const tabClick = event.target.closest('.tab')

        tabClick.parentElement.querySelector('.active').classList.remove('active')
        tabClick.classList.add('active')

        tabContents.forEach(tabContent => {
          if (tabClick.dataset.form === tabContent.dataset.form) {
            tabContent.classList.add('active')
          } else {
            tabContent.classList.remove('active')
          }
        })
      }
    })

    deleteButton.addEventListener('click', () => {
      deleteButton.classList.add('active')
    })

    setTimeout(() => {

    })

    form.addEventListener('input', (event) => {
      if (event.target.closest('[data-minlength]')) {
        const input = event.target.closest('[data-minlength]')

        if (input.value.length < input.dataset.minlength && input.value.length > 0) {
          input.classList.add('active')
        } else {
          input.classList.remove('active')
        }
      }

      if (event.target.closest('[data-onlyletters]')) {
        const input = event.target.closest('[data-onlyletters')
        // console.log(input.value);
        if (/^[a-zA-Z]+$/.test(input.value)) {
          input.classList.remove('active')
        } else {
          input.classList.add('active')
        }
      }
    })
  }
}
customElements.define('tabs-component', Tabs)
