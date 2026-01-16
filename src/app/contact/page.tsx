
'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');

    toast({
      title: "Message Sent!",
      description: `Thank you for reaching out, ${name}. We'll get back to you soon.`,
    });
    e.currentTarget.reset();
  };

  return (
    <>
      <Header />
      <main className="bg-gray-50 py-12">
        <div className="container mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
            <p className="mt-2 text-lg text-muted-foreground">We'd love to hear from you!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <form onSubmit={handleSendMessage} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Your message..." required />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-6">Our Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Our Address</h3>
                    <p className="text-gray-600">Nischintapur, Rampurhat, West Bengal 731224</p>
                    <a href="https://google.com/maps/place/Combo+Cafe+%26+Gifts+Shop/data=!4m2!3m1!1s0x0:0x20d4a8fe5d070ebc?sa=X&ved=1t:2428&ictx=111" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                      Get Directions
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <a href="tel:8436860216" className="text-gray-600 hover:text-primary">84368 60216</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <a href="mailto:combocafe24x7@gmail.com" className="text-gray-600 hover:text-primary">combocafe24x7@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
