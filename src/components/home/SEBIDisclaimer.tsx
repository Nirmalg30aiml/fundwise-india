import { Shield, ExternalLink, AlertTriangle } from 'lucide-react';

export function SEBIDisclaimer() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="glass-card rounded-2xl p-6 md:p-8 border border-warning-amber/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning-amber/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-warning-amber" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Important Disclaimer
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                <strong>Mutual fund investments are subject to market risks. 
                Please read all scheme-related documents carefully before investing.</strong>
              </p>
              
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>• Past performance is not indicative of future returns.</li>
                <li>• This platform is for educational purposes only and does not constitute investment advice.</li>
                <li>• Fund categorization follows SEBI circular dated October 2017.</li>
                <li>• Always consult a qualified financial advisor before making investment decisions.</li>
              </ul>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://investor.sebi.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Shield className="w-4 h-4" />
                  SEBI Investor Education
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://www.amfiindia.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  AMFI India
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
