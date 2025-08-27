import { Button } from "@/components/ui/button";
import { CheckCircle, Shield } from "lucide-react";

export const OthersSection = () => {
  return (
    <>
      <section
        id="security"
        className="py-16 px-6 bg-[var(--card)] transition-colors duration-300 mx-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
                Bank-Grade Security
              </h2>
              <p className="text-[var(--muted-foreground)] mb-6 transition-colors duration-300">
                We use the same encryption standards as major financial
                institutions to protect your money and data.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">256-bit SSL Encryption</h3>
                    <p className="text-[var(--muted-foreground)]">
                      All data is encrypted end-to-end
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Biometric Authentication</h3>
                    <p className="text-[var(--muted-foreground)]">
                      Face ID and fingerprint recognition
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Fraud Monitoring</h3>
                    <p className="text-[var(--muted-foreground)]">
                      24/7 monitoring of suspicious activity
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--chart-5)] rounded-2xl p-1 w-full max-w-md">
                <div className="bg-[var(--card)] rounded-xl p-8 h-full flex items-center justify-center">
                  <Shield className="h-32 w-32 text-[var(--primary)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[var(--primary)] to-[var(--chart-5)] text-[var(--primary-foreground)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join millions of users who have simplified their financial lives
            with PayWallet.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="px-8 py-3 text-lg bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)]"
          >
            Get Started for Free
          </Button>
        </div>
      </section>
    </>
  );
};
