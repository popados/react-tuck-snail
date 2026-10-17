import { TuckFace } from '@/components/TuckFace'

// Tuck's answer after a check-in: matching art and line on a moss-wash notice.
// A low answer also gets a tear-wash note about 988. Never red.
export function CheckInReply({ mood }) {
  return (
    <div role="status" className="flex flex-col gap-10">
      <div className="flex items-center gap-16 rounded-lg bg-moss-wash p-16">
        <div className="flex w-[96px] shrink-0 items-center justify-center rounded-sm bg-art-ground p-6">
          <img src={mood.art} alt={mood.alt} className="block h-auto w-full" />
        </div>
        <p className="m-0 text-body">
          <TuckFace mood={mood.face} /> {mood.reply}
        </p>
      </div>
      {mood.id === 'low' && (
        <p className="m-0 rounded-lg bg-tear-wash p-16 text-note">
          if today feels heavy, someone is there to listen. call or text <a href="tel:988">988</a>.
        </p>
      )}
    </div>
  )
}
