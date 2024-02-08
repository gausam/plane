import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// icons
import { MoveLeft } from "lucide-react";

type BreadcrumbsProps = {
  children: any;
};

const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex w-full flex-grow items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
        <button
          type="button"
          className="group grid h-7 w-7 flex-shrink-0 cursor-pointer place-items-center rounded border border-sidebar-neutral-border-medium text-center text-sm hover:bg-sidebar-neutral-component-surface-medium"
          onClick={() => router.back()}
        >
          <MoveLeft className="h-4 w-4 text-sidebar-neutral-text-medium group-hover:text-sidebar-neutral-text-strong" />
        </button>
        {children}
      </div>
    </>
  );
};

type BreadcrumbItemProps = {
  title: string;
  link?: string;
  icon?: any;
  linkTruncate?: boolean;
  unshrinkTitle?: boolean;
};

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  title,
  link,
  icon,
  linkTruncate = false,
  unshrinkTitle = false,
}) => (
  <>
    {link ? (
      <Link href={link}>
        <span
          className={`border-r-2 border-sidebar-neutral-border-medium px-3 text-sm ${linkTruncate ? "truncate" : ""}`}
        >
          <p className={`${linkTruncate ? "truncate" : ""}${icon ? "flex items-center gap-2" : ""}`}>
            {icon ?? null}
            {title}
          </p>
        </span>
      </Link>
    ) : (
      <div className={`truncate px-3 text-sm ${unshrinkTitle ? "flex-shrink-0" : ""}`}>
        <p className={`truncate ${icon ? "flex items-center gap-2" : ""}`}>
          {icon}
          <span className="break-words">{title}</span>
        </p>
      </div>
    )}
  </>
);

Breadcrumbs.BreadcrumbItem = BreadcrumbItem;

export { Breadcrumbs, BreadcrumbItem };
