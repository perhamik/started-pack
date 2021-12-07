'use strict'
// Map number x from range [a, b] to [c, d]
export const map = (x: number, a: number, b: number, c: number, d: number): number => ((x - a) * (d - c)) / (b - a) + c

// Linear interpolation
export const lerp = (a: number, b: number, n: number): number => (1 - n) * a + b * n

export const distance = (x1: number, y1: number, x2: number, y2: number): number => Math.hypot(x1 - x2, y1 - y2)

export const isFocusEvent = (e: Event): boolean => e.type.includes('focus')

export const getHeaderHeight = (): number => {
	const header: HTMLHeadingElement = document.querySelector('.header')
	return header ? Math.floor(header.offsetHeight - 0.5) : 64
}

export const getHeaderVisibleHeight = (): number => {
	const header: HTMLHeadingElement = document.querySelector('.header')
	return header && header.classList.contains('header-hide') ? 0 : getHeaderHeight()
}

export const delay = (ms: number) =>
	new Promise((resolve) => {
		let start = +new Date()
		while (+new Date() - start < ms);
		resolve(true)
	})

export function debounce(func: Function, wait: number = 30, immediate: boolean = false): Function {
	let timeout: number
	return function () {
		let context = this,
			args = arguments
		let later = function () {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		let callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = window.setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

//check the input string contains '#' or '.'
//otherwise return => '#selector, .selector'
//execution of document.querySelector('#selector, .selector')
//returns match by id or className
//string
export const similarSelector = (selector: string): string => {
	return selector.includes('#') || selector.includes('.') ? selector : `#${selector}, .${selector}`
}

//check if child element belongs the parent
//boolean
export const isChildOf = (child: HTMLElement, parent: HTMLElement): boolean => {
	const parentSelectors = Array.from(parent.classList).map((cl) => `.${cl}`)
	parent.getAttribute('id') && parentSelectors.push(`#${parent.getAttribute('id')}`)

	return parentSelectors.filter((selector) => child.closest(selector)).length > 0
}

export const toggleHover = debounce(
	(e: MouseEvent) => {
		//define event type => true if cursor in
		//false if cursor out
		const state = e.type === 'mouseover' || e.type === 'mouseenter'
		const target: HTMLElement = e.currentTarget as HTMLElement
		//currentTarget => element on which assigned the listener
		target.classList.toggle('hover', state)
	},
	30,
	true,
)

export const toggleOpen = debounce(
	(e: Event) => {
		const target: HTMLElement = e.currentTarget as HTMLElement
		const state = target.classList.contains('open')
		//currentTarget => element on which assigned the listener
		target.classList.toggle('open', !state)
	},
	30,
	true,
)

interface togglerFunction {
	(e: Event, elem: HTMLElement): void
}

export const toggleState = debounce(
	(e: Event, toggler: togglerFunction) => {
		toggler(e, e.currentTarget as HTMLElement)
	},
	30,
	true,
)

export const getHTMLElement = (elem: Element): HTMLElement | null => {
	return elem ? (elem as HTMLElement) : null
}
