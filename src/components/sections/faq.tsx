import { config } from '@/app/config';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-headline text-foreground">Have a Question?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">We've got answers to some common queries right here.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {config.faq.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-body text-lg font-semibold text-left hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-base text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
