import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const ProfilePreferenceSettingsSidebar = () => {
  const router = useRouter();

  const profilePreferenceLinks: Array<{
    label: string;
    href: string;
  }> = [
    {
      label: "Theme",
      href: `/profile/preferences/theme`,
    },
    {
      label: "Email",
      href: `/profile/preferences/email`,
    },
  ];
  return (
    <div className="flex w-96 flex-col gap-6 px-8 py-12">
      <div className="flex flex-col gap-4">
        <span className="text-xs font-semibold text-neutral-text-subtle">Preference</span>
        <div className="flex w-full flex-col gap-2">
          {profilePreferenceLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  (link.label === "Import" ? router.asPath.includes(link.href) : router.asPath === link.href)
                    ? "bg-custom-primary-100/10 text-custom-primary-100"
                    : "text-sidebar-neutral-text-medium hover:bg-sidebar-neutral-component-surface-dark focus:bg-sidebar-neutral-component-surface-dark"
                }`}
              >
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
