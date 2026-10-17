import { cx } from '@/lib/faces'

// A square caramel post tile. Text and outline stay on-caramel in both themes.
// For art, pass an <img> of /mascot/tuck-tucked-white.svg (the caramel shell
// would vanish on caramel). Pass sub={null} to drop the second line.
export function SocialTile({
  headline = 'Some days are shell days.',
  sub = 'That counts too.',
  signature,
  art,
  className,
}) {
  return (
    <div
      className={cx(
        'box-border flex aspect-square w-full max-w-[360px] flex-col items-center justify-center gap-12 rounded-lg border-2 border-on-caramel bg-caramel p-20 text-center text-on-caramel [&_:focus-visible]:outline-on-caramel',
        className,
      )}
    >
      {art && <div className="[&_img]:block [&_img]:h-auto [&_img]:w-[150px]">{art}</div>}
      <p className="m-0 text-heading">{headline}</p>
      {sub !== null && <p className="m-0 text-note font-semibold">{sub}</p>}
      {signature && <p className="m-0 text-caption">{signature}</p>}
    </div>
  )
}
