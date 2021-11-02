import {toggleHover} from './utils'

const switchButtonOnClick = (e: Event) => {
	//data-state="close" - default state (closed, inactive)
	//data-state="open" - open state
	//data-text="" - used in open state

	//get current button
	const button = e.currentTarget as HTMLElement

	//data-state === "open" => true -> open, false -> closed
	const currentState = button?.dataset?.state?.includes('open')
	//set next state true (open) => 'close' otherwise => 'open'
	const nextState = currentState ? 'close' : 'open'

	//get current button child with text
	const container: HTMLElement = button.querySelector(`.button__container`)
	const width = currentState ? container.dataset.widthClose : container.dataset.widthOpen
	container.style.setProperty('width', `${width}px`)
	//toggle button data-state
	button.dataset.state = nextState
}

const initSwitchButtons = (buttons: Array<Element>) => {
	buttons.forEach((button) => {
		const initState: string = button.getAttribute('data-state')
		const defaultState: string = initState ? initState : 'close'
		const container: HTMLElement = button.querySelector('.button__container')
		const inner: HTMLElement = button.querySelector('.button__text')
		if (inner) {
			const text = {
				close: inner.textContent.trim(),
				open: inner.dataset.text.trim(),
			}
			const altText = inner.cloneNode(false) as HTMLElement
			container.style.setProperty('width', `${inner.offsetWidth}px`)
			inner.dataset.visibility = 'close'
			altText.dataset.visibility = 'open'

			inner.textContent = text.close
			altText.textContent = text.open
			altText.removeAttribute('data-text')
			inner.removeAttribute('data-text')
			container.append(altText)
			container.setAttribute('data-width-close', `${inner.offsetWidth}`)
			container.setAttribute('data-width-open', `${altText.offsetWidth}`)
		}
		button.setAttribute('data-state', defaultState)
		button.addEventListener('toggleButton', switchButtonOnClick, {passive: true})
	})
}

//entry point
export const initButtons = () => {
	return new Promise((res) => {
		//select button with rotate icon
		const rotateButtons = document.querySelectorAll('.button.icon-rotate')
		const stateButtons: Array<Element> = [...document.querySelectorAll('.button-invisible-buy')]
		const buttons = [...rotateButtons, ...stateButtons]

		stateButtons.length && initSwitchButtons(stateButtons)

		buttons.length &&
			buttons.forEach((btn) => {
				const button = btn as HTMLElement
				//assign listeners on cursor in and out
				button.addEventListener('mouseleave', (e) => toggleHover(e), {passive: true})
				button.addEventListener('mouseenter', (e) => toggleHover(e), {passive: true})
			})
		res(true)
	})
}
