import { Link } from 'react-router-dom';
import { TrendingUp, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                MF<span className="text-primary">Gyan</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering Indian investors with knowledge about equity mutual funds. 
              Learn, compare, and make informed investment decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/learn" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Learn About Funds
                </Link>
              </li>
              <li>
                <Link to="/screener" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Fund Screener
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Direct vs Regular Calculator
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="https://investor.sebi.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  SEBI Investor Education
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* SEBI Disclaimer */}
          <div>
            <h4 className="font-semibold mb-4">Important</h4>
            <div className="p-4 bg-warning-amber-light rounded-xl border border-warning-amber/20">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Disclaimer:</strong> Mutual fund investments are subject to market risks. 
                Please read all scheme-related documents carefully before investing. 
                Past performance is not indicative of future returns.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MFGyan. All rights reserved. Educational purposes only.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.sebi.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              SEBI Registered
            </a>
            <a 
              href="https://www.amfiindia.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              AMFI Certified
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
