import {DropDown} from './Dropdown'

const getEventType = (e: Event) => e?.type?.toLowerCase().includes('focus')

const getFieldElement = (e: Event) => {
	const target = e.currentTarget as HTMLElement
	return target.parentElement ?? target
}

const onFieldEvent = (e: Event) => {
	const target = getFieldElement(e)
	target?.classList.toggle('focus', getEventType(e))
}

const initDropDowns = () => {
	const dropDownItems = document.querySelector('.dropdown')
		? [...document.querySelectorAll('.dropdown')].map((item) => item as HTMLElement)
		: []
	if (!dropDownItems.length) return

	const dropDowns = dropDownItems.map((item) => new DropDown(item))
}

export const initInputs = () => {
	return new Promise((resolve) => {
		initDropDowns()

		const inputs = document.querySelectorAll('input, textarea')
		if (inputs.length) {
			inputs.forEach((item) => {
				item.addEventListener('focus', (e) => onFieldEvent(e), {passive: true})
				item.addEventListener('blur', (e) => onFieldEvent(e), {passive: true})
			})
		}
		resolve(true)
	})
}
