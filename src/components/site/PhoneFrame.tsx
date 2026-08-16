// App-Screenshots im Telefonrahmen. Die Aufnahmen entstehen mit
// `npm run screenshots` in 390×844 bei doppelter Auflösung — das Seitenverhältnis
// hier muss dazu passen, sonst verzerrt der Rahmen das Bild.

import { screenshotUrl } from "@/lib/screenshots";

export function PhoneFrame({
  screenshot,
  alt,
  priority = false,
  className = "",
}: {
  screenshot: string;
  alt: string;
  /** Für das Bild im Hero: sofort laden statt beim Scrollen. */
  priority?: boolean;
  className?: string;
}) {
  const src = screenshotUrl(screenshot);

  return (
    <div className={`relative mx-auto w-full max-w-[280px] ${className}`}>
      <div className="absolute inset-0 -z-10 translate-y-4 rounded-[3rem] bg-foreground/20 blur-2xl" />
      {/* Kein Notch: die Aufnahmen enthalten keine Statusleiste, ein
          aufgemalter Notch läge über dem Inhalt statt über ihr. */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-black/85 bg-cream shadow-2xl">
        {src ? (
          <img
            src={src}
            alt={alt}
            width={390}
            height={844}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            className="block aspect-[390/844] w-full object-cover"
          />
        ) : (
          // Fehlt eine Aufnahme, bleibt der Rahmen sichtbar statt zu kollabieren.
          <div className="flex aspect-[390/844] w-full items-center justify-center bg-muted text-xs text-muted-foreground">
            {screenshot}.png fehlt — npm run screenshots
          </div>
        )}
      </div>
    </div>
  );
}
