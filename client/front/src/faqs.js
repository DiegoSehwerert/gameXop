class Faqs extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.faqs = []
  }

  async connectedCallback () {
    this.loadData().then(() => this.render())
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`)
    const data = await response.json()
    this.faqs = data.rows
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>

      .faqs-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      details {
        color: hsl(0, 0%, 100%);
        font-family: 'Lato', sans-serif;
        font-size: 1.2rem;
      }

      summary {
        border-bottom: 1px solid hsl(0, 0%, 100%);
        color: hsl(0, 0%, 100%);
        cursor: pointer;
        font-family: 'Lato', sans-serif;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        padding: 0.5rem;
      }
    </style>

    <div class="faqs-container"></div>
    `

    const faqsContainer = this.shadow.querySelector('.faqs-container')

    this.faqs.forEach(faq => {
      const details = document.createElement('details')
      const summary = document.createElement('summary')
      const title = document.createElement('p')
      const content = document.createElement('p')
      title.textContent = faq.name
      content.textContent = faq.question
      summary.appendChild(title)
      details.appendChild(summary)
      details.appendChild(content)
      faqsContainer.appendChild(details)
    })
  }
}

customElements.define('faqs-component', Faqs)
