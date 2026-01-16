
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What are your delivery hours?",
    answer: "We deliver from 10:00 AM to 8:00 PM every day. You can choose a convenient time slot during checkout."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is dispatched, you will receive an SMS with a tracking link. You can also track your order from the 'Track Order' section on our website."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI, and popular digital wallets. Cash on Delivery (COD) is also available for most locations."
  },
  {
    question: "Can I customize my cake order?",
    answer: "Yes, we offer customization options for many of our cakes, including photo prints and special messages. Please contact our customer support for specific requests."
  },
   {
    question: "What is your return policy?",
    answer: "Due to the perishable nature of our products, we do not accept returns. However, if you receive a damaged or incorrect item, please contact us immediately for a replacement or refund."
  }
];


export default function FaqsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="container mx-auto py-12">
          <Button asChild variant="outline" className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
                <p className="mt-2 text-lg text-muted-foreground">Find answers to common questions below.</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger suppressHydrationWarning>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
