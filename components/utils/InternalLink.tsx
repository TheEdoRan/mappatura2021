import Link from "next/link";

type Props = {
  href: string;
  text: string;
  className?: string;
};

const InternalLink = ({ href, text, className }: Props) => (
  <Link href={href}>
    <a className={className}>{text}</a>
  </Link>
);

export default InternalLink;
