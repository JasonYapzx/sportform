import Link from "next/link";

export default function Footer() {
    return (
      <footer className="pb-4">
        <div>
          <div className="flex flex-col-reverse justify-between pt-5 pb-4 pl-4 border-t lg:flex-row bg-top border-black">
            <ul className="flex flex-col space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
              <li>
                <Link
                  href="/"
                  className="text-md text-black transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-md text-black transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-md text-black transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
                >
                  Ad Choices
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-md text-black transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-md text-black transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
                >
                  Partners
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
              <Link
                href="/"
                className="text-md text-black transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold tracking-tight"
              >
                © 2023 Company Inc.
              </Link>
            </ul>
          </div>
        </div>
      </footer>
    );
  }