import type { PublicProfile } from '../../api/types'
import { resolveProfileCardTemplate } from './profileCardTemplate'

/** Bright accent gradient shown behind the avatar when no cover image is set. */
const COVER_FALLBACK =
  'linear-gradient(135deg, rgba(107,47,213,0.85) 0%, rgba(56,189,248,0.75) 100%)'

type ProfileCardHeaderProps = {
  profile: PublicProfile
  onOpenImage: (src: string) => void
}

/**
 * Cover, photo, and identity for a public card.
 * Portrait is the large photo with the name beside it.
 * Classic is the smaller photo with the name underneath.
 */
export function ProfileCardHeader({
  profile,
  onOpenImage,
}: ProfileCardHeaderProps) {
  const template = resolveProfileCardTemplate(profile.cardTemplate)
  if (template === 'classic') {
    return <ClassicCardHeader profile={profile} onOpenImage={onOpenImage} />
  }
  return <PortraitCardHeader profile={profile} onOpenImage={onOpenImage} />
}

function PortraitCardHeader({ profile, onOpenImage }: ProfileCardHeaderProps) {
  return (
    <>
      <header className="relative">
        <Cover profile={profile} onOpenImage={onOpenImage} />
        <Avatar
          profile={profile}
          onOpenImage={onOpenImage}
          className="absolute -bottom-24 left-4 h-32 w-32 rounded-3xl border-4 shadow-[0_10px_24px_rgba(15,23,42,0.18)]"
          initialClassName="text-4xl"
        />
      </header>
      <section>
        <div className="flex min-h-24 items-center pl-[9.75rem] pr-4 sm:pr-5">
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink">
              {profile.displayName}
            </h1>
            <StackedRole profile={profile} />
          </div>
        </div>
        {profile.bio ? (
          <p className="mt-3 px-4 text-[13px] leading-relaxed text-slate-600 sm:px-5">
            {profile.bio}
          </p>
        ) : null}
      </section>
    </>
  )
}

function ClassicCardHeader({ profile, onOpenImage }: ProfileCardHeaderProps) {
  return (
    <>
      <header className="relative">
        <Cover profile={profile} onOpenImage={onOpenImage} />
        <Avatar
          profile={profile}
          onOpenImage={onOpenImage}
          className="absolute -bottom-8 left-4 h-16 w-16 rounded-2xl border-[3px] shadow-[0_6px_14px_rgba(15,23,42,0.15)]"
          initialClassName="text-xl"
        />
      </header>
      <section className="mt-10 px-4 sm:px-5">
        <h1 className="font-display text-lg font-bold leading-tight tracking-tight text-ink">
          {profile.displayName}
        </h1>
        {profile.designation || profile.companyName ? (
          <p className="mt-0.5 text-[13px] text-slate-600">
            {profile.designation}
            {profile.designation && profile.companyName ? ' · ' : ''}
            {profile.companyName}
          </p>
        ) : null}
        {profile.bio ? (
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
            {profile.bio}
          </p>
        ) : null}
      </section>
    </>
  )
}

function Cover({ profile, onOpenImage }: ProfileCardHeaderProps) {
  if (profile.coverImageUrl) {
    return (
      <button
        type="button"
        onClick={() => onOpenImage(profile.coverImageUrl!)}
        className="block aspect-[3/1] w-full cursor-zoom-in border-0 bg-transparent p-0"
        aria-label="View cover photo"
      >
        <img
          src={profile.coverImageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      </button>
    )
  }

  return (
    <div
      className="aspect-[3/1] w-full"
      style={{ background: COVER_FALLBACK }}
      aria-hidden
    />
  )
}

function Avatar({
  profile,
  onOpenImage,
  className,
  initialClassName,
}: ProfileCardHeaderProps & {
  className: string
  initialClassName: string
}) {
  const frame = `overflow-hidden border-white ${className}`

  if (profile.profileImageUrl) {
    return (
      <button
        type="button"
        onClick={() => onOpenImage(profile.profileImageUrl!)}
        className={`${frame} cursor-zoom-in bg-slate-200 p-0`}
        aria-label={`View profile photo of ${profile.displayName}`}
      >
        <img
          src={profile.profileImageUrl}
          alt={profile.displayName}
          className="h-full w-full object-cover"
        />
      </button>
    )
  }

  return (
    <div
      className={`flex items-center justify-center bg-slate-100 font-semibold text-slate-400 ${initialClassName} ${frame}`}
    >
      {profile.displayName.trim().charAt(0).toUpperCase()}
    </div>
  )
}

function StackedRole({ profile }: { profile: PublicProfile }) {
  if (!profile.designation && !profile.companyName) return null

  return (
    <div className="mt-0.5">
      {profile.designation ? (
        <p className="text-[13px] text-slate-600">{profile.designation}</p>
      ) : null}
      {profile.companyName ? (
        <p className="text-[13px] text-slate-600">{profile.companyName}</p>
      ) : null}
    </div>
  )
}
