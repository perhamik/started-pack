import {debounce, isChildOf, similarSelector} from './utils'

//toggle popup class 'popup-open' by state true | false
const togglePopupState = (popup: HTMLElement, state: boolean = false) => popup?.classList.toggle('popup-open', state)

//debounce of background click event
//click event on the element which not belong to current popup => will close it
const onBgClick = debounce(
	(e: MouseEvent, popup: HTMLElement) => !isChildOf(e.target as HTMLElement, popup) && togglePopupState(popup, false),
	15,
	true,
)

//debounce of button click event
const onButtonClick = debounce((popup: HTMLElement, state: boolean) => togglePopupState(popup, state), 15, true)

//if popup contains <button class=".button-close">
//add listener onClick => close popup
const initCloseButton = (popup: HTMLElement) => {
	const closeButtons = popup?.querySelectorAll('[data-action="close"]')

	if (closeButtons && closeButtons.length) {
		closeButtons.forEach((button) => button.addEventListener('click', () => onButtonClick(popup, false)))
	}
}

//init listener onClick on background
const initOnBgClickClose = (popup: HTMLElement, except: HTMLElement) => {
	document.addEventListener(
		'click',
		(e) => {
			e.target !== except && onBgClick(e, popup, except)
		},
		{passive: true},
	)
}

//popup initialization begin
const initPopupListeners = (button: HTMLElement) => {
	const popup: HTMLElement = document.querySelector(`${similarSelector(button.dataset.popup)}`)

	if (popup) {
		initCloseButton(popup)
		initOnBgClickClose(popup, button)

		button?.addEventListener('click', () => onButtonClick(popup, true))
	}
}

//entry point
export const initPopups = () => {
	return new Promise((resolve) => {
		//element recommended to match the pattern => data-popup="#popup-id"
		const openButtons = document.querySelectorAll('[data-popup]')
		openButtons.length && openButtons.forEach((button) => initPopupListeners(button as HTMLElement))
		resolve(true)
	})
}
