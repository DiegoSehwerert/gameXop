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
      /* html */`
      <style>
        button{
          border: none;
          background: none;
          cursor: pointer;
        }
        svg{
          background-color: none;
          fill: white;
          width:100%;
        }

        .head{
          background-color: hsl(225.95,64.16%,66.08%);
          display:flex;
          width:100%;
        }
        .head-tabs{
          display:flex;
          justify-content: flex-start;
          width:50%;
        }
        .tab{
          align-items:center;
          background-color: hsl(206.87,84.81%,69.02%);
          color:white;
          display:flex;
          justify-content:center;
          margin: 0 1rem 0 0;
          width:45%;
        }
        .head-icons{
          display:flex;
          justify-content: flex-end;
          width:50%;
        }
        .icon{
          width:3rem;
          padding: 0 1rem 0 1rem;
        }

          
      </style>
      <form>
        <div class="head">
          <div class="head-tabs">
            <div class="tab">
              <span>General</span>
            </div>
            <div class="tab">
              <span>Images</span>
            </div>
          </div>
          <div class="head-icons">
            <div class="icon">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>broom</title><path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" /></svg>
              </button>
            </div>
            <div class="icon">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
              </button>
            </div>
          </div>
        </div>
          <div class="tab-content">
            <div class="form-row">
              <div class="form-element">
                <div class="form-element-label">
                  <label for="title">
                    Titulo
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
    `
  }
}
customElements.define('tabs-component', Tabs)
