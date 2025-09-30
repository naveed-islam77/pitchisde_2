import { useState } from "react";
import { AuthModal } from "./AuthModal";

export default function Auth() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
