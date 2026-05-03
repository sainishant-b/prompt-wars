interface Props {
  children: React.ReactNode;
}

export function StampBadge({ children }: Props) {
  return <span className="stamp">{children}</span>;
}
