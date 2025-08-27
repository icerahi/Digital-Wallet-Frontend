// src/components/FeaturesPage.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Banknote,
  BarChart3,
  Bell,
  CreditCard,
  History,
  QrCode,
  Receipt,
  Send,
  Settings,
  Shield,
  Smartphone,
  User,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

export default function FeaturesPage() {
  const userFeatures = [
    {
      icon: <User className="h-8 w-8 text-[var(--primary)]" />,
      title: "User Registration",
      description:
        "Create your account in minutes with our simple registration process and get your digital wallet instantly.",
    },
    {
      icon: <Wallet className="h-8 w-8 text-[var(--primary)]" />,
      title: "Digital Wallet",
      description:
        "Get a secure digital wallet upon registration to store, manage, and transact your money digitally.",
    },
    {
      icon: <ArrowDownCircle className="h-8 w-8 text-[var(--primary)]" />,
      title: "Add Money",
      description:
        "Easily add money to your wallet from any authorized Bondhu Pay agent near you.",
    },
    {
      icon: <Send className="h-8 w-8 text-[var(--primary)]" />,
      title: "Send Money",
      description:
        "Instantly send money to friends, family, or businesses with just a few taps on your phone.",
    },
    {
      icon: <ArrowUpCircle className="h-8 w-8 text-[var(--primary)]" />,
      title: "Withdraw Money",
      description:
        "Withdraw cash from your digital wallet at any Bondhu Pay agent location.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-[var(--primary)]" />,
      title: "Balance Overview",
      description:
        "View your current wallet balance with a clear, easy-to-understand dashboard.",
    },
    {
      icon: <History className="h-8 w-8 text-[var(--primary)]" />,
      title: "Transaction History",
      description:
        "Access your complete transaction history with detailed information and filters.",
    },
    {
      icon: <Settings className="h-8 w-8 text-[var(--primary)]" />,
      title: "Account Settings",
      description:
        "Manage your account settings, security preferences, and notification options.",
    },
  ];

  const agentFeatures = [
    {
      icon: <UserCheck className="h-8 w-8 text-[var(--primary)]" />,
      title: "Agent Registration",
      description:
        "Become a Bondhu Pay agent and start serving your community with digital financial services.",
    },
    {
      icon: <ArrowDownCircle className="h-8 w-8 text-[var(--primary)]" />,
      title: "Cash In Service",
      description:
        "Help users add money to their digital wallets quickly and securely.",
    },
    {
      icon: <ArrowUpCircle className="h-8 w-8 text-[var(--primary)]" />,
      title: "Cash Out Service",
      description:
        "Process cash withdrawals for users from their digital wallets.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-[var(--primary)]" />,
      title: "Agent Dashboard",
      description:
        "Monitor your transaction volume, earnings, and performance with our comprehensive dashboard.",
    },
    {
      icon: <History className="h-8 w-8 text-[var(--primary)]" />,
      title: "Transaction Records",
      description:
        "Keep track of all your transactions with detailed records and reporting tools.",
    },
    {
      icon: <Settings className="h-8 w-8 text-[var(--primary)]" />,
      title: "Agent Settings",
      description:
        "Customize your agent profile, commission rates, and service availability.",
    },
  ];

  const commonFeatures = [
    {
      icon: <Smartphone className="h-8 w-8 text-[var(--primary)]" />,
      title: "Mobile App",
      description:
        "Access all features on the go with our intuitive mobile application for both Android and iOS.",
    },
    {
      icon: <Shield className="h-8 w-8 text-[var(--primary)]" />,
      title: "Security",
      description:
        "Bank-level security with encryption, biometric authentication, and fraud monitoring.",
    },
    {
      icon: <Bell className="h-8 w-8 text-[var(--primary)]" />,
      title: "Notifications",
      description:
        "Real-time alerts for transactions, promotions, and important account updates.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-[var(--primary)]" />,
      title: "Payment Options",
      description:
        "Multiple payment methods including bank transfers, cards, and mobile money.",
    },
    {
      icon: <Banknote className="h-8 w-8 text-[var(--primary)]" />,
      title: "Low Fees",
      description:
        "Affordable transaction fees with transparent pricing and no hidden charges.",
    },
    {
      icon: <Users className="h-8 w-8 text-[var(--primary)]" />,
      title: "Community",
      description:
        "Join a growing community of users and agents across South Asia.",
    },
    {
      icon: <QrCode className="h-8 w-8 text-[var(--primary)]" />,
      title: "QR Payments",
      description:
        "Send and receive money instantly using QR codes for quick in-person transactions.",
    },
    {
      icon: <Receipt className="h-8 w-8 text-[var(--primary)]" />,
      title: "Digital Receipts",
      description:
        "Get instant digital receipts for all your transactions for easy record-keeping.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Features Tabs */}
      <section className="py-16 px-6 bg-[var(--card)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-[var(--muted)]">
              <TabsTrigger
                value="user"
                className="data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--primary-foreground)]"
              >
                User Features
              </TabsTrigger>
              <TabsTrigger
                value="agent"
                className="data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--primary-foreground)]"
              >
                Agent Features
              </TabsTrigger>
              <TabsTrigger
                value="common"
                className="data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--primary-foreground)]"
              >
                Common Features
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
                  Features for Users
                </h2>
                <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
                  Everything you need to manage your money digitally, securely,
                  and conveniently.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="border-[var(--border)] shadow-md hover:shadow-lg transition-all duration-300 bg-[var(--card)] hover:-translate-y-1"
                  >
                    <CardHeader className="text-center">
                      <div className="mb-4">{feature.icon}</div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[var(--muted-foreground)] text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="agent" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
                  Features for Agents
                </h2>
                <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
                  Tools and features to help agents serve their community and
                  grow their business.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="border-[var(--border)] shadow-md hover:shadow-lg transition-all duration-300 bg-[var(--card)] hover:-translate-y-1"
                  >
                    <CardHeader className="text-center">
                      <div className="mb-4">{feature.icon}</div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[var(--muted-foreground)] text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="common" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
                  Features for Everyone
                </h2>
                <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
                  Core features that enhance the experience for both users and
                  agents.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {commonFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="border-[var(--border)] shadow-md hover:shadow-lg transition-all duration-300 bg-[var(--card)] hover:-translate-y-1"
                  >
                    <CardHeader className="text-center">
                      <div className="mb-4">{feature.icon}</div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[var(--muted-foreground)] text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-[var(--background)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
              How Bondhu Pay Works
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
              Simple steps to get started with Bondhu Pay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-[var(--border)] shadow-md bg-[var(--card)]">
              <CardHeader className="text-center">
                <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <CardTitle className="text-xl">Register</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[var(--muted-foreground)] text-center">
                  Create your account as a user or agent in minutes with just
                  your mobile number and ID.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)] shadow-md bg-[var(--card)]">
              <CardHeader className="text-center">
                <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <CardTitle className="text-xl">Verify & Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[var(--muted-foreground)] text-center">
                  Complete verification and set up your wallet with security
                  features like PIN and biometrics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)] shadow-md bg-[var(--card)]">
              <CardHeader className="text-center">
                <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <CardTitle className="text-xl">Transact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[var(--muted-foreground)] text-center">
                  Start sending, receiving, and managing money with our secure
                  digital platform.
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
            Ready to Experience Bondhu Pay?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join millions of users and agents who are already enjoying the
            benefits of digital finance with Bondhu Pay.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-3 text-lg bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)]"
            >
              Download App
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg border-white text-white hover:bg-white/10"
            >
              Become an Agent
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
