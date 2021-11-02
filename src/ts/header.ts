import {debounce, getHeaderHeight} from './utils'

const getHeaderForceState = () => {
	const openPopupCondition = document.querySelector('.popup.open, .popup-open')
	const conditions = [openPopupCondition].filter((item) => item)
	return conditions.length > 0
}

const setLanguage = (selectedElem, current, options, headerSearch) => {
	const searchOption = options.filter((item) => {
		item.classList.toggle('dropdown-hide', false)
		return item === current
	})
	const activeOption = searchOption[0]

	activeOption?.classList?.toggle('dropdown-hide', true)
	const optionValue = activeOption?.dataset?.value ?? 'ua'

	selectedElem.textContent = activeOption?.textContent?.trim()
	headerSearch.dataset.current = optionValue
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

const initSearch = (header: HTMLElement) => {
	return new Promise((res) => {
		const headerSearch: HTMLElement = header.querySelector('.header__dropdown')

		const options = [...headerSearch?.querySelector('.dropdown__list')?.children]
		const activeClass = headerSearch?.dataset?.classActive ?? 'dropdown-active'
		const selectClass = headerSearch?.dataset?.classSelect ?? 'dropdown__selected'
		const selectedElem = headerSearch?.querySelector(`.${selectClass}`)

		setLanguage(selectedElem, options[0], options, headerSearch)

		headerSearch &&
			headerSearch.addEventListener(
				'click',
				(e) => {
					const choice = e.target as HTMLElement
					if (choice.dataset.value) {
						setLanguage(selectedElem, choice, options, headerSearch)
					}
					headerSearch.classList.toggle(activeClass, !headerSearch.classList.contains(activeClass))
				},
				false,
			)

		res(true)
	})
}

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
