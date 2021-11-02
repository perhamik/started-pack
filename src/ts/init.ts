import {Accordion} from './Accordion'
import {getHeaderHeight} from './utils'
import {initHeader} from './header'
import {initButtons} from './buttons'
import {initCards} from './cards'
import {initInputs} from './inputs'
import {initPopups} from './popup'
import {initWords} from './words'

const state = {
	init: false,
	initResult: false,
}

const setVh = (): void => {
	const vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
}

const setHeaderHeight = (): void => {
	document.documentElement.style.setProperty('--header-height', `${getHeaderHeight()}px`)
}

const cardHover = (e: MouseEvent) => {
	const target = e.currentTarget as HTMLElement
	const card = target ? target.children[0] : null
	if (!card) return

	card?.classList.toggle('hover', e.type.includes('mouseover'))
}

const initPage = () => {
	const ideasList = document.querySelectorAll('.ideas__item')
	const details = document.querySelectorAll('details')
	const page = document.querySelector('.page')

	if (page) {
		setTimeout(() => {
			page.classList.toggle('init', false)
		}, 600)
	}

	if (details.length) {
		details.forEach((el) => new Accordion(el))
	}

	if (ideasList.length) {
		ideasList.forEach((item) => {
			item.addEventListener('mouseover', (e) => cardHover, {passive: true})
			item.addEventListener('mouseout', (e) => cardHover, {passive: true})
		})
	}
}

const initQueue = (): void => {
	if (state.initResult) return

	initHeader()
		.then(initButtons)
		.then(initPopups)
		.then(initInputs)
		.then(initCards)
		.then(initWords)
		.then(() => {
			state.initResult = true
			initPage()
		})
		.catch((msg) => {
			console.warn(msg)
		})
		.finally(() => {
			state.init = true
		})
}

const init = (): void => {
	switch (document.readyState) {
		case 'interactive':
			setVh()
			setHeaderHeight()
			break

		case 'complete':
			setVh()
			setHeaderHeight()
			initQueue()
			break

		default:
			break
	}
}

document.addEventListener('readystatechange', init, false)
