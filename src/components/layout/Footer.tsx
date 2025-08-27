import { Logo } from "@/assets/icons/Logo";

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-[var(--card)] text-[var(--muted-foreground)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Logo />
            </div>
            <p className="text-sm">
              The simplest way to manage your money securely.
            </p>
          </div>

          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Business
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Developers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] text-sm text-center">
          <p>© {new Date().getFullYear()} Bondhu Pay. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="#"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
