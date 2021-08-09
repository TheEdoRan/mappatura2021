type Props = {
  href: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
};

const ExternalLink = ({ href, text, children, className }: Props) => (
  <a
    className={`text-sm font-light text-gray-300 hover:underline ${className}`}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {text}
    {children}
  </a>
);

export default ExternalLink;
