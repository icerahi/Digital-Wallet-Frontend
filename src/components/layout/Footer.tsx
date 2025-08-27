import { Logo } from "@/assets/icons/Logo";
import { Link } from "react-router";

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
                <Link
                  to="/features"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Business
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  API Docs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] text-sm text-center">
          <p>© {new Date().getFullYear()} Bondhu Pay. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link
              to="#"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
