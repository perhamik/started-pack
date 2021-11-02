export function DropDown(dropDown: HTMLElement) {
	const toggler = dropDown?.querySelector('.dropdown__toggle') as HTMLElement
	const menu = dropDown?.querySelector('.dropdown__list') as HTMLElement
	const menuItems = menu && menu.children ? [...menu.children].map((item) => item as HTMLElement) : []

	const handleClickOut = (e: MouseEvent) => {
		const target = e.target as HTMLElement
		if (!dropDown) {
			return document.removeEventListener('click', (e) => handleClickOut(e))
		}

		if (!dropDown.contains(target)) {
			this.toggle(false)
		}
	}

	const setValue = (item: HTMLElement) => {
		if (!item || !toggler) return

		const val = item.textContent
		toggler.textContent = val
		this.value = val
		this.toggle(false)
		dropDown.dispatchEvent(new Event('change'))
		toggler.focus()
		console.log(this.value)
	}

	const handleItemKeyDown = (e: KeyboardEvent) => {
		e.preventDefault()
		const target = e.target as HTMLElement
		const prev = target.previousElementSibling as HTMLElement
		const next = target.nextElementSibling as HTMLElement

		if (e.code === 'ArrowUp' && prev) {
			// up
			prev.focus()
		} else if (e.code === 'ArrowDown' && next) {
			// down
			next.focus()
		} else if (e.code === 'Escape') {
			// escape key
			this.toggle(false)
		} else if (e.code === 'Enter' || e.code === 'Space') {
			// enter or spacebar key
			setValue(target)
		}
	}

	const handleToggleKeyPress = (e: KeyboardEvent) => {
		e.preventDefault()

		if (e.code === 'Escape') {
			// escape key
			this.toggle(false)
		} else if (e.code === 'Enter' || e.code === 'Space') {
			// enter or spacebar key
			this.toggle(true)
		}
	}

	this.element = dropDown
	this.value = toggler?.textContent?.trim()

	this.toggle = (expand = null) => {
		const expandState = expand === null ? menu.getAttribute('aria-expanded') !== 'true' : expand
		menu.setAttribute('aria-expanded', expandState)

		if (expandState) {
			toggler.classList.add('active')
			menuItems[0].focus()
			document.addEventListener('click', (e) => handleClickOut(e))
			dropDown.dispatchEvent(new Event('opened'))
		} else {
			toggler.classList.remove('active')
			dropDown.dispatchEvent(new Event('closed'))
			document.removeEventListener('click', (e) => handleClickOut(e))
		}
	}

	if (menuItems.length) {
		menuItems.forEach((item) => {
			item.addEventListener('keydown', (e) => handleItemKeyDown(e))
			item.addEventListener('click', () => setValue(item))
		})
	}

	toggler && toggler.addEventListener('keydown', (e) => handleToggleKeyPress(e))
	toggler && toggler.addEventListener('click', () => this.toggle())

	dropDown.addEventListener('click', (e) => {
		const target = e.target as HTMLElement
		if (target.parentElement !== menu) {
			this.toggle()
		}
	})
}
