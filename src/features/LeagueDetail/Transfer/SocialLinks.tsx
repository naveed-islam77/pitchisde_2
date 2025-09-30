import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconWorld,
} from "@tabler/icons-react";

function SocialLinks() {
  return (
    <div id="socialLinks" className="h-full hidden md:block">
      <ul className="space-y-2 text-dark font-display">
        <li>
          <a
            target="__blank"
            href="https://facebook.com"
            className="flex items-center gap-3 hover:underline"
          >
            <IconBrandFacebook />
            <span className="text-lg">Facebook</span>
          </a>
        </li>
        <li>
          <a
            target="__blank"
            href="https://instagram.com"
            className="flex items-center gap-3 hover:underline"
          >
            <IconBrandInstagram />
            <span className="text-lg">Instagram</span>
          </a>
        </li>
        <li>
          <a
            target="__blank"
            href="https://instagram.com"
            className="flex items-center gap-3 hover:underline"
          >
            <IconBrandX />
            <span className="text-lg">Twitter</span>
          </a>
        </li>
        <li>
          <a
            target="__blank"
            href="https://uk_pl.com"
            className="flex items-center gap-3 hover:underline"
          >
            <IconWorld />
            <span className="text-lg">Website</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SocialLinks;
