type Props = {
  href: string;
  text: string;
  className?: string;
};

const ExternalLink = ({ href, text, className }: Props) => (
  <a
    className={className}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {text}
  </a>
);

export default ExternalLink;
