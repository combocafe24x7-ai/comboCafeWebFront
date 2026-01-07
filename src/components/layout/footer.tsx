import { config } from "@/app/config";
import { cn } from "@/lib/utils";

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
