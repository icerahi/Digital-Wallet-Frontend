// src/components/AboutPage.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  Globe,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTeamMembers([
        {
          name: "Rahim Khan",
          role: "CEO & Founder",
          bio: "Financial technology visionary with 15+ years of experience in digital payments",
          initials: "RK",
        },
        {
          name: "Fatema Ahmed",
          role: "CTO",
          bio: "Blockchain and security expert leading our technical innovation",
          initials: "FA",
        },
        {
          name: "Karim Chowdhury",
          role: "Head of Design",
          bio: "Creating intuitive user experiences for financial applications",
          initials: "KC",
        },
        {
          name: "Sultana Begum",
          role: "Marketing Director",
          bio: "Building our community and spreading the Bondhu Pay mission",
          initials: "SB",
        },
      ]);

      setMilestones([
        {
          year: "2020",
          title: "Founded",
          description:
            "Bondhu Pay was established with a vision to simplify digital payments in Bangladesh",
        },
        {
          year: "2021",
          title: "First Million Users",
          description:
            "Reached our first million users milestone within 18 months",
        },
        {
          year: "2022",
          title: "International Expansion",
          description:
            "Expanded services to neighboring countries in South Asia",
        },
        {
          year: "2023",
          title: "Crypto Integration",
          description:
            "Launched cryptocurrency support for modern financial needs",
        },
      ]);

      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-[var(--primary)]" />,
      title: "Customer First",
      description:
        "We prioritize our users' needs and build products that solve real problems",
    },
    {
      icon: <Shield className="h-8 w-8 text-[var(--primary)]" />,
      title: "Security & Trust",
      description:
        "Bank-level security and complete transparency in all our operations",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-[var(--primary)]" />,
      title: "Innovation",
      description:
        "Constantly pushing boundaries to create the future of digital finance",
    },
    {
      icon: <Globe className="h-8 w-8 text-[var(--primary)]" />,
      title: "Financial Inclusion",
      description:
        "Making financial services accessible to everyone, everywhere",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Our Story Section */}
      <section
        id="story"
        className="py-16 px-6 bg-[var(--card)] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
              Our Story
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
              From a simple idea to a movement changing millions of lives
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-[var(--card-foreground)] leading-relaxed">
                Bondhu Pay began in 2020 with a simple observation: too many
                people in our communities were excluded from the formal
                financial system. Traditional banking was inaccessible,
                expensive, and often intimidating.
              </p>
              <p className="text-lg text-[var(--card-foreground)] leading-relaxed">
                Our founders, a team of finance and technology experts, came
                together with a vision to create a digital wallet that would be
                simple, secure, and accessible to everyone - regardless of their
                income, location, or technical knowledge.
              </p>
              <p className="text-lg text-[var(--card-foreground)] leading-relaxed">
                Today, Bondhu Pay serves millions of users across multiple
                countries, processing billions in transactions annually. But our
                mission remains the same: to empower people with financial
                freedom and opportunity.
              </p>
            </div>

            <div className="relative">
              <div className="bg-[var(--muted)] rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">10M+ Users</h3>
                  <p className="text-[var(--muted-foreground)]">
                    Trusted across South Asia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-6 bg-[var(--background)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-[var(--border)] shadow-md bg-[var(--card)]">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Target className="h-10 w-10 text-[var(--primary)] mr-4" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-[var(--card-foreground)]">
                  To democratize financial services by providing simple, secure,
                  and accessible digital payment solutions that empower
                  individuals and businesses to thrive in the digital economy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)] shadow-md bg-[var(--card)]">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Award className="h-10 w-10 text-[var(--primary)] mr-4" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-[var(--card-foreground)]">
                  A world where everyone has access to affordable financial
                  services, where digital payments are seamless and secure, and
                  where financial inclusion drives economic growth and social
                  progress.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        id="values"
        className="py-16 px-6 bg-[var(--card)] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
              Our Values
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-[var(--border)] shadow-md hover:shadow-lg transition-all duration-300 bg-[var(--card)] hover:-translate-y-1"
              >
                <CardHeader className="text-center">
                  <div className="mb-4">{value.icon}</div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[var(--muted-foreground)] text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-16 px-6 bg-[var(--background)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
              Our Journey
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
              Key milestones in our growth story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Card
                    key={index}
                    className="border-[var(--border)] shadow-md bg-[var(--card)]"
                  >
                    <CardHeader>
                      <Skeleton className="h-8 w-16 mb-2" />
                      <Skeleton className="h-6 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6 mt-2" />
                    </CardContent>
                  </Card>
                ))
              : milestones.map((milestone, index) => (
                  <Card
                    key={index}
                    className="border-[var(--border)] shadow-md bg-[var(--card)]"
                  >
                    <CardHeader>
                      <Badge
                        variant="secondary"
                        className="w-fit bg-[var(--accent)] text-[var(--accent-foreground)]"
                      >
                        {milestone.year}
                      </Badge>
                      <CardTitle className="text-xl">
                        {milestone.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[var(--muted-foreground)]">
                        {milestone.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        className="py-16 px-6 bg-[var(--card)] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
              Meet Our Team
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
              The passionate people behind Bondhu Pay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Card
                    key={index}
                    className="border-[var(--border)] shadow-md bg-[var(--card)]"
                  >
                    <CardHeader className="text-center">
                      <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-6 w-3/4 mx-auto" />
                      <Skeleton className="h-4 w-1/2 mx-auto" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6 mt-2" />
                    </CardContent>
                  </Card>
                ))
              : teamMembers.map((member, index) => (
                  <Card
                    key={index}
                    className="border-[var(--border)] shadow-md hover:shadow-lg transition-all duration-300 bg-[var(--card)] hover:-translate-y-1"
                  >
                    <CardHeader className="text-center">
                      <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {member.initials}
                      </div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <CardDescription className="text-[var(--primary)] font-medium">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[var(--muted-foreground)] text-center">
                        {member.bio}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 px-6 bg-[var(--background)] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
              Get in Touch
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
              We'd love to hear from you. Reach out to our team for any
              inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-[var(--border)] shadow-md bg-[var(--card)]">
              <CardHeader className="text-center">
                <div className="bg-[var(--accent)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-[var(--accent-foreground)]" />
                </div>
                <CardTitle className="text-xl">Email Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-[var(--muted-foreground)]">
                  support@bondhupay.com
                </CardDescription>
                <CardDescription className="text-[var(--muted-foreground)]">
                  partnerships@bondhupay.com
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)] shadow-md bg-[var(--card)]">
              <CardHeader className="text-center">
                <div className="bg-[var(--accent)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-[var(--accent-foreground)]" />
                </div>
                <CardTitle className="text-xl">Call Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-[var(--muted-foreground)]">
                  +880 1234 567890
                </CardDescription>
                <CardDescription className="text-[var(--muted-foreground)]">
                  Mon-Fri, 9AM-6PM
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)] shadow-md bg-[var(--card)]">
              <CardHeader className="text-center">
                <div className="bg-[var(--accent)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-[var(--accent-foreground)]" />
                </div>
                <CardTitle className="text-xl">Visit Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-[var(--muted-foreground)]">
                  Bondhu Pay Tower
                </CardDescription>
                <CardDescription className="text-[var(--muted-foreground)]">
                  Gulshan, Dhaka, Bangladesh
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[var(--primary)] to-[var(--chart-5)] text-[var(--primary-foreground)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Growing Family
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Be part of the financial revolution. Download Bondhu Pay today and
            experience the future of digital payments.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="px-8 py-3 text-lg bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)]"
          >
            Download Now
          </Button>
        </div>
      </section>
    </div>
  );
}
