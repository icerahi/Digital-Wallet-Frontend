import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const FAQ = ({
  heading = "Frequently asked questions",
  items = [
    {
      id: "faq-1",
      question: "What are the main roles in this app?",
      answer:
        "There are two main roles: User and Agent. Users can register and use a wallet, while Agents can help Users with cash-in and cash-out transactions.",
    },
    {
      id: "faq-2",
      question: "What happens when I register as a User?",
      answer:
        "When you register as a User, you automatically get a wallet where you can add money, send money to other Users, and withdraw money through Agents.",
    },
    {
      id: "faq-3",
      question: "How can I add money to my wallet?",
      answer:
        "You can add money to your wallet by visiting an Agent. The Agent can cash in the amount you want, and it will reflect in your wallet balance.",
    },
    {
      id: "faq-4",
      question: "Can I send money to another User?",
      answer:
        "Yes, as a User you can send money directly to another User’s wallet. The transferred amount will be deducted from your wallet and added to the recipient’s wallet instantly.",
    },
    {
      id: "faq-5",
      question: "How can I withdraw money from my wallet?",
      answer:
        "You can withdraw money by visiting an Agent. The Agent will process the cash-out, and the withdrawn amount will be deducted from your wallet balance.",
    },
    {
      id: "faq-6",
      question: "What transactions can an Agent perform?",
      answer:
        "Agents can cash in to a User’s wallet (deposit money) and cash out from a User’s wallet (withdraw money).",
    },
    {
      id: "faq-7",
      question: "Can I see my balance and transaction history?",
      answer:
        "Yes, both Users and Agents can view their wallet balance, transaction history, and account settings in a clear and organized way.",
    },
    {
      id: "faq-8",
      question: "Is my money safe in the wallet?",
      answer:
        "Yes, your money is securely stored in your wallet. You can view all transactions to track your activity, ensuring transparency and safety.",
    },
  ],
}: Faq1Props) => {
  return (
    <section className="py-32">
      <div className="container max-w-3xl mx-auto">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
