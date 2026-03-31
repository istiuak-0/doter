import { attach } from 'iocraft'
import { store } from 'iocraft/common'

interface CartState {
  items: { id: string; name: string; price: number }[]
  coupon: string | null
}

@attach()
export class CartStore extends store<CartState>({
  items: [],
  coupon: null,
}) {
  total = this.compute(s =>
    s.items.reduce((sum, item) => sum + item.price, 0)
  )

  itemCount = this.compute(s => s.items.length)

  addItem(item: CartState['items'][number]) {
    this.update({ items: [...this.state.items, item] })
  }

  removeItem(id: string) {
    this.update({ items: this.state.items.filter(i => i.id !== id) })
  }

  applyCoupon(code: string) {
    this.update({ coupon: code })
  }

  clear() {
    this.reset()
  }
}