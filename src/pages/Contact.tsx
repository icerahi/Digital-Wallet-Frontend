// src/components/ContactPage.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Simulate random success/error for demo
      const success = Math.random() > 0.2; // 80% success rate
      setSubmitStatus(success ? "success" : "error");

      // Reset form on success
      if (success) {
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-[var(--primary)]" />,
      title: "Email Us",
      details: ["support@bondhupay.com", "partnerships@bondhupay.com"],
    },
    {
      icon: <Phone className="h-6 w-6 text-[var(--primary)]" />,
      title: "Call Us",
      details: ["+880 1234 567890", "+880 9876 543210"],
    },
    {
      icon: <MapPin className="h-6 w-6 text-[var(--primary)]" />,
      title: "Visit Us",
      details: ["Bondhu Pay Tower, Gulshan", "Dhaka, Bangladesh"],
    },
    {
      icon: <Clock className="h-6 w-6 text-[var(--primary)]" />,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
    },
  ];

  return (
    <section className="py-16 px-6 bg-[var(--card)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex-col w-[50%] mx-auto gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-[var(--border)] shadow-md bg-[var(--card)]">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Send className="h-6 w-6 mr-2 text-[var(--primary)]" />
                  Send us a message
                </CardTitle>
                <CardDescription className="text-[var(--muted-foreground)]">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-[var(--foreground)]"
                      >
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-[var(--foreground)]"
                      >
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="subject"
                      className="text-[var(--foreground)]"
                    >
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1 bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-[var(--foreground)]"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="mt-1 bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submission Status */}
                  {submitStatus === "success" && (
                    <div className="flex items-center p-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-lg">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>
                        Thank you! Your message has been sent successfully.
                      </span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center p-4 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-lg">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>
                        Oops! Something went wrong. Please try again later.
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 transition-colors duration-200"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-20 mx-20">
          <div className="">
            <h2 className="text-2xl font-bold mb-6">Other ways to reach us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="border-[var(--border)] shadow-md bg-[var(--card)]"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center">
                      {info.icon}
                      <CardTitle className="text-lg ml-3">
                        {info.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-[var(--muted-foreground)] mb-1"
                      >
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
