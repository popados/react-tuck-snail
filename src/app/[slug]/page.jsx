import { notFound } from 'next/navigation'
import { NAV_ITEMS } from '@/app/navItems'
import { ComingSoonPage } from '@/screens/ComingSoonPage/ComingSoonPage'

// Nav entries without a page of their own yet (built: false in navItems.js)
// get the placeholder. Any other one-segment path is a 404.
const unbuilt = NAV_ITEMS.filter((item) => !item.built)
const find = (slug) => unbuilt.find((item) => item.to === `/${slug}`)

export const dynamicParams = false

export function generateStaticParams() {
  return unbuilt.map((item) => ({ slug: item.to.slice(1) }))
}

export async function generateMetadata({ params }) {
  const item = find((await params).slug)
  return item ? { title: item.label } : {}
}

export default async function Page({ params }) {
  const item = find((await params).slug)
  if (!item) notFound()
  return <ComingSoonPage title={item.label} />
}
