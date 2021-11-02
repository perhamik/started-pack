import {debounce, getHeaderHeight} from './utils'

const getHeaderForceState = () => {
	const openPopupCondition = document.querySelector('.popup.open, .popup-open')
	const conditions = [openPopupCondition].filter((item) => item)
	return conditions.length > 0
}

//debounce wheel handler
const updateHeader = debounce(
	(e: WheelEvent) => {
		const setState = getHeaderForceState() || e.deltaY > 0
		document.querySelector('.header')?.classList.toggle('header-hide', setState)
	},
	30,
	true,
)

const initBurger = () => {
	return new Promise((res) => {
		const burger = document.querySelector('.header__burger')

		burger &&
			burger.addEventListener(
				'click',
				() => {
					burger.classList.toggle('active', !burger.classList.contains('active'))
				},
				false,
			)

		res(true)
	})
}

export const initHeader = () => {
	return new Promise((resolve) => {
		const header = document.querySelector('header')
		if (!header) {
			resolve(true)
			return
		}

		setInterval(() => {
			document.documentElement.style.setProperty('--header-height', `${getHeaderHeight()}px`)
		}, 1350)

		initBurger().then(() => {
			document.addEventListener('wheel', (e) => updateHeader(e), {passive: true})
			document.documentElement.style.setProperty('--header-height', `${getHeaderHeight()}px`)
			header.classList.toggle('transparent', false)
			resolve(true)
		})
	})
}
