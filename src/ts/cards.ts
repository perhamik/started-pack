import {toggleHover, toggleOpen} from './utils'

const toggleButtonEvent = new Event('toggleButton')

const onTabsCardClick = (e: Event) => {
	const tab = e.currentTarget as HTMLElement
	const button = tab.querySelector('.button')

	if (button) {
		button.dispatchEvent(toggleButtonEvent)
	}
	toggleOpen(e)
}

//entry point
export const initCards = () => {
	return new Promise((res) => {
		const cards = document.querySelectorAll('.card-buy')
		const tabsCards = document.querySelectorAll('.tabs-card__item')

		cards.length &&
			cards.forEach((item) => {
				const card = item as HTMLElement
				card.addEventListener('mouseleave', (e) => toggleHover(e), {passive: true})
				card.addEventListener('mouseenter', (e) => toggleHover(e), {passive: true})
			})

		tabsCards.length &&
			tabsCards.forEach((tab) => {
				const item = tab as HTMLElement
				item.addEventListener('click', (e) => onTabsCardClick(e), {passive: true})
			})
		res(true)
	})
}
