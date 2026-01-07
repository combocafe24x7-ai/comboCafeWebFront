import { config } from '@/app/config';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground">Get In Touch</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">We'd love to hear from you. Visit us for a coffee or drop us a line.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="shadow-lg dark:shadow-black/20 border-0 p-4">
                <CardContent className="p-6">
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <MapPin className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-lg">Address</h4>
                                <p className="text-muted-foreground">{config.contact.address}</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-4">
                            <Phone className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-lg">Phone</h4>
                                <a href={`tel:${config.contact.phone}`} className="text-muted-foreground hover:text-primary transition-colors">{config.contact.phone}</a>
                            </div>
                        </li>
                         <li className="flex items-start gap-4">
                            <Mail className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-lg">Email</h4>
                                <a href={`mailto:${config.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">{config.contact.email}</a>
                            </div>
                        </li>
                         <li className="flex items-start gap-4">
                            <Clock className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-lg">Opening Hours</h4>
                                <p className="text-muted-foreground">{config.contact.hours}</p>
                            </div>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg dark:shadow-black/20">
                 <Image src={config.contact.mapImage.url} alt="Map location of the cafe" fill className="object-cover" data-ai-hint={config.contact.mapImage.hint} />
            </div>
        </div>
      </div>
    </section>
  );
}
