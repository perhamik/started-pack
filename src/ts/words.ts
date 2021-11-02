const splitTextByWords = (parent: HTMLElement) => {
	const text = parent.textContent.trim()
	const words = text.split(' ')
	parent.innerHTML = ''

	words.length &&
		words.forEach((word, index) => {
			const space = words.length - 1 > index ? ' ' : ''
			const span = document.createElement('span')
			span.classList.add('word')
			span.textContent = `${word}${space}`
			parent.append(span)
		})
}

export const initWords = () => {
	return new Promise((res) => {
		const splitByWords = document.querySelectorAll('[data-word-split="true"]')

		if (splitByWords.length) {
			;[...splitByWords].forEach((item) => splitTextByWords(item as HTMLElement))
		}

		res(true)
	})
}
