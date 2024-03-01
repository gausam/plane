import { useTheme } from "next-themes";
import Image from "next/image";
import { FC } from "react";
// images
import GoogleLogo from "/public/logos/google-logo.svg";

export type GoogleOAuthButtonProps = {
  text: string;
};

export const GoogleOAuthButton: FC<GoogleOAuthButtonProps> = (props) => {
  const { text } = props;
  // hooks
  const { resolvedTheme } = useTheme();

  const handleSignIn = () => {
    window.location.assign("http://localhost:8000/auth/google/");
  };

  return (
    <button
      className={`flex h-[42px] w-full items-center justify-center gap-2 rounded border px-2 text-sm font-medium text-custom-text-100 duration-300 hover:bg-onboarding-background-300 ${
        resolvedTheme === "dark" ? "border-[#43484F] bg-[#2F3135]" : "border-[#D9E4FF]"
      }`}
      onClick={handleSignIn}
    >
      <Image src={GoogleLogo} height={18} width={18} alt="Google Logo" />
      {text}
    </button>
  );
};
