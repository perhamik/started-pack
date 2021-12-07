import {getHeaderHeight, delay} from './utils'

history.scrollRestoration = 'manual'

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

const coreInit = (): Promise<boolean> => {
	return new Promise((res) => {
		setVh()
		setHeaderHeight()
		res(true)
	})
}

const initQueue = (): void => {
	if (state.initResult) return

	coreInit()
		.then(() => {
			state.initResult = true
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
			window.scrollTo({top: 0})
			coreInit()
			break

		case 'complete':
			initQueue()
			break

		default:
			break
	}
}

const initPageSwitch = () => {
	const page = document.querySelector('div.page') ? (document.querySelector('div.page') as HTMLElement) : document.body

	window.addEventListener('blur', () => page.classList.toggle('blur', true))
	window.addEventListener('focus', () => page.classList.toggle('blur', false))
	window.addEventListener('beforeunload', () => page.classList.add('unloaded'))
	window.addEventListener('unload', async () => await delay(500))
	window.onunload = async () => await delay(500)
}

document.addEventListener('DOMContentLoaded', () => initPageSwitch(), {once: true})
document.addEventListener('readystatechange', () => init(), false)
