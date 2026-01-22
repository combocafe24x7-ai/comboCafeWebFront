
"use client";
import React, { useState, useEffect } from 'react';
import { config } from '@/app/config';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const FooterLinkColumn = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
  <div>
    <h4 className="font-semibold text-gray-800 mb-4">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const FooterAccordion = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
    <AccordionItem value={title}>
        <AccordionTrigger suppressHydrationWarning>{title}</AccordionTrigger>
        <AccordionContent>
            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <a href={link.href} className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </AccordionContent>
    </AccordionItem>
)

export default function Footer() {
  const { toast } = useToast();
  const [copyrightText, setCopyrightText] = useState(config.footer.copyright);

  useEffect(() => {
    setCopyrightText(
      config.footer.copyright.replace('{YEAR}', new Date().getFullYear().toString())
    );
  }, []);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    if (email) {
      toast({
        title: "Subscribed!",
        description: `Thank you for subscribing, ${email}!`,
      });
      e.currentTarget.reset();
    }
  };

  return (
    <footer className="bg-section-alternate pt-12">
      <div className="container mx-auto">
        {/* Desktop Footer */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h4 className="font-semibold text-gray-800 mb-4">About The Company</h4>
            <p className="text-sm text-gray-600 mb-6 max-w-md">
              {config.footer.about}
            </p>
            <h4 className="font-semibold text-gray-800 mb-4">Subscribe to our newsletter</h4>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input name="email" type="email" placeholder="Enter your email" className="bg-white" required suppressHydrationWarning />
              <Button type="submit" suppressHydrationWarning>Subscribe</Button>
            </form>
          </div>
          <FooterLinkColumn title="Help & Support" links={config.footer.links.help} />
          <FooterLinkColumn title="Business Solutions" links={config.footer.links.business} />
          <FooterLinkColumn title="Our Policies" links={config.footer.links.policies} />
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden">
            <div className="md:col-span-2">
                <h4 className="font-semibold text-gray-800 mb-4">About The Company</h4>
                <p className="text-sm text-gray-600 mb-6 max-w-md">
                {config.footer.about}
                </p>
            </div>
            <Accordion type="multiple" className="w-full">
                <FooterAccordion title="Help & Support" links={config.footer.links.help} />
                <FooterAccordion title="Business Solutions" links={config.footer.links.business} />
                <FooterAccordion title="Our Policies" links={config.footer.links.policies} />
            </Accordion>
             <div className="mt-8">
                <h4 className="font-semibold text-gray-800 mb-4">Subscribe to our newsletter</h4>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input name="email" type="email" placeholder="Enter your email" className="bg-white" required suppressHydrationWarning />
                <Button type="submit" suppressHydrationWarning>Subscribe</Button>
                </form>
            </div>
        </div>

        {/* Social and Payments */}
        <div className="mt-12 py-6 border-t flex flex-col md:flex-row justify-center items-center gap-6">
           <div className="flex items-center gap-4">
             <span className="text-sm font-medium">Follow Us:</span>
             <div className="flex items-center gap-3">
              {(config.footer.social as any[]).map(({label, Icon, href, mobileHref}) => (
                <React.Fragment key={label}>
                    {/* Mobile link */}
                    <a href={mobileHref} className="text-gray-500 hover:text-gray-900 md:hidden">
                        <Icon className="w-5 h-5" />
                    </a>
                    {/* Desktop link */}
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 hidden md:block">
                        <Icon className="w-5 h-5" />
                    </a>
                </React.Fragment>
              ))}
             </div>
           </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-gray-800 text-gray-300 py-3">
        <div className="container mx-auto text-center text-xs">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
