import { useState } from "react";

interface AccountMenuProps {
  name: string | null;
  role: string | null;
  isLoading: boolean;
}

function getInitials(name: string | null) {
  if (!name) {
    return "?";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function AccountMenu({ name, role, isLoading }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayName = name ?? "Account";
  const displayRole = role ?? "Authenticated user";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          border
          border-zinc-800
          bg-zinc-900
          px-3
          py-2
          text-left
          transition
          hover:border-zinc-700
          hover:bg-zinc-800
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-zinc-800
            text-sm
            font-semibold
            text-zinc-200
          "
        >
          {isLoading ? "..." : getInitials(name)}
        </div>

        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="truncate text-sm font-medium text-zinc-200">
            {isLoading ? "Loading..." : displayName}
          </p>

          <p className="truncate text-xs text-zinc-500">
            {isLoading ? "Checking authentication" : displayRole}
          </p>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`
            hidden
            h-4
            w-4
            text-zinc-500
            transition-transform
            sm:block
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && !isLoading && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-2
            w-64
            overflow-hidden
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900
            shadow-xl
          "
        >
          <div className="px-4 py-3">
            <p className="truncate text-sm font-medium text-white">
              {displayName}
            </p>

            <p className="mt-1 text-xs text-zinc-500">{displayRole}</p>
          </div>

          <div className="border-t border-zinc-800">
            <a
              href="/outpost.goauthentik.io/sign_out"
              className="
                flex
                w-full
                items-center
                gap-3
                px-4
                py-3
                text-sm
                text-zinc-300
                transition
                hover:bg-zinc-800
                hover:text-white
              "
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
              </svg>
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;
