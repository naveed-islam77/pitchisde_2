import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Card, CardContent } from "./ui/card";
import { Cookie, X } from "lucide-react";
import { Button } from "./ui/button";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setVisible(false);
  };

  const declineCookies = () => {
    Cookies.set("cookie_consent", "declined", { expires: 365 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50 animate-in slide-in-from-bottom-4 duration-300">
      <Card className="shadow-2xl border-border/50 backdrop-blur-sm bg-card/95">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground leading-tight">
                  We value your privacy
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setVisible(false)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                We use essential cookies to make our site work and analytics
                cookies to understand how you interact with our site. By
                clicking "Accept all", you consent to our use of cookies.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={declineCookies}
                  className="flex-1 text-sm bg-transparent"
                >
                  Decline
                </Button>
                <Button
                  onClick={acceptCookies}
                  className="flex-1 text-sm bg-[#006428] hover:bg-[#006428]"
                >
                  Accept all
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
