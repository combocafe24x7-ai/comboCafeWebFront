
import { config } from "@/app/config.tsx";
import { cn } from "@/lib/utils";
import { Instagram, Twitter, Facebook } from "lucide-react";

const WhatsAppIcon = (props: React.ComponentProps<'svg'>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="WhatsApp"
    >
      <path d="M16.75 13.96c.25.13.42.2.46.3.05.1.05.75-.2 1.3-.25.55-1.12 1.1-1.52 1.25-.4.15-1.07.13-1.6-.08s-2.15-1-3.6-2.5c-1.15-1.15-2-2.5-2.2-2.9-.2-.4-.04-.6.12-.77.16-.17.35-.2.5-.2s.33.02.47.22c.14.2.3.66.35.7.05.05.07.12.02.2-.05.08-.1.18-.2.25-.1.08-.2.12-.25.2-.06.07-.12.15-.05.27.07.12.33.56.7.92.56.5.94.75 1.1.8.14.05.24.03.32-.03.1-.06.42-.5.54-.66.12-.17.22-.15.32-.1.1.04.65.3.75.36zM12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c1.85 0 3.55-.5 5-1.35l-1.3-1.3c-1.1.5-2.35.8-3.7.8a8 8 0 1 1 8-8c0 1.35-.3 2.6-.8 3.7l1.3 1.3C21.5 15.55 22 13.85 22 12A10 10 0 0 0 12 2z"/>
    </svg>
  );

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-headline text-2xl text-foreground">{config.brand.name}</h3>
            <p className="mt-2 text-sm max-w-xs">Blending taste, warmth, and celebration under one roof.</p>
          </div>
          <div className="md:justify-self-center">
            <h4 className="font-bold tracking-wider uppercase text-foreground mb-4">Links</h4>
            <ul className="space-y-2">
              {config.footer.links.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-primary transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:justify-self-end">
             <h4 className="font-bold tracking-wider uppercase text-foreground mb-4">Follow Us</h4>
             <div className="flex justify-center md:justify-start space-x-4">
              {config.footer.social.map(({label, Icon, href}) => (
                <a key={label} href={href} aria-label={label} className="text-muted-foreground hover:text-primary transition-colors">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
             </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm">
          <p>{config.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
