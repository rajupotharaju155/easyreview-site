import type { PublicMenuItem, PublicMenuPriceVariant } from '../../api/types'
import { useMenuContext } from '../../hooks/useMenuContext'
import { formatMoney } from '../../lib/money'
import { priceForVariant } from '../../lib/menuPricing'
import { ItemCartControl } from './order/ItemCartControl'

export function SalonPriceTable({
  variants,
  items,
}: {
  variants: PublicMenuPriceVariant[]
  items: PublicMenuItem[]
}) {
  const { currency, cart } = useMenuContext()
  if (variants.length === 0 || items.length === 0) return null

  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="sticky left-0 w-[28%] bg-white py-2 pr-2 text-left text-[11px] font-semibold text-ink">
              Services
            </th>
            {variants.map((variant, index) => (
              <th
                key={variant.id}
                className={`px-1 py-2 text-center align-bottom text-[10px] font-medium leading-[1.15] break-words text-muted ${
                  index % 2 === 0 ? 'bg-slate-50' : 'bg-slate-200/70'
                }`}
              >
                {variant.name}
              </th>
            ))}
            {cart ? <th className="w-[4.75rem] py-2" aria-label="Add to cart" /> : null}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-slate-100 last:border-b-0">
              <th className="sticky left-0 bg-white py-2 pr-2 text-left text-[12px] font-medium leading-snug text-ink">
                {item.name}
              </th>
              {variants.map((variant, index) => {
                const price = priceForVariant(item, variant.id)
                return (
                  <td
                    key={variant.id}
                    className={`px-0.5 py-2 text-center text-[12px] leading-tight tabular-nums ${
                      index % 2 === 0 ? 'bg-slate-50' : 'bg-slate-200/70'
                    } ${price == null ? 'text-slate-400' : 'font-semibold text-ink'}`}
                  >
                    {price == null ? '' : formatMoney(price, currency)}
                  </td>
                )
              })}
              {cart ? (
                <td className="py-2 pl-1.5 text-right">
                  <ItemCartControl item={item} variants={variants} />
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
