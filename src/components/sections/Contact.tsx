import { ArrowUpRight, Building2, Github, MapPin } from "lucide-react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { MY_DETAILS } from "@/data/portfolio";

const CHANNELS = [
  {
    icon: Github,
    label: "GitHub",
    value: MY_DETAILS.github.replace("https://", ""),
    href: MY_DETAILS.github,
  },
  {
    icon: MapPin,
    label: "Location",
    value: MY_DETAILS.address,
    href: null,
  },
  {
    icon: Building2,
    label: "Currently",
    value: `${MY_DETAILS.role} ${MY_DETAILS.company}`,
    href: MY_DETAILS.companyLink,
  },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title="Happy to walk through any of it"
      lede="Most of the systems above are private, so the code isn't public — but the architecture, the tradeoffs, and the things that went wrong are all fair game. Email is the fastest way to reach me."
    >
      <Reveal>
        <a
          href={`mailto:${MY_DETAILS.email}`}
          className="group inline-flex max-w-full items-baseline gap-3 break-all font-serif text-h2 font-medium italic text-fg transition-colors hover:text-accent"
        >
          {MY_DETAILS.email}
          <ArrowUpRight
            className="h-6 w-6 shrink-0 self-center text-fg3 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:h-7 md:w-7"
            strokeWidth={1.5}
          />
        </a>
      </Reveal>

      <Reveal delay={0.08}>
        <dl className="mt-14 border-t border-line">
          {CHANNELS.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="grid gap-2 border-b border-line py-5 md:grid-cols-[15rem_1fr] md:gap-10 md:px-4"
            >
              <dt className="label flex items-center gap-2 text-fg3">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                {label}
              </dt>
              <dd className="break-all font-mono text-sm text-fg2">
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    className="transition-colors hover:text-accent"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
