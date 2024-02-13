class SaveModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('save-notification', (event) => {
      console.log('Save notification received')
    })
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
            <style>
            </style>
         `
  }

  openModal (event) {
    console.log('Save successful')
  }
}

customElements.define('save-modal-component', SaveModal)
